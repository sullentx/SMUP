import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogItem } from '../../models/catalog.model';
import { CatalogService } from '../../service/catalog.service';

@Component({
  selector: 'app-general-catalog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './general-catalog-list.component.html',
  styleUrls: ['./general-catalog-list.component.scss']
})
export class GeneralCatalogListComponent implements OnInit {
  fullList: CatalogItem[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getCatalogItems().subscribe(items => {
      this.fullList = items;
    });
  }

  get filteredList(): CatalogItem[] {
    return this.fullList.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedList(): CatalogItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredList.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredList.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }
}

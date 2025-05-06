import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteButtonComponent } from '../buttons/delete-button/delete-button.component';
import { EditButtonComponent } from '../buttons/edit-button/edit-button.component';
import { StudyService } from '../../service/study.service';
import { Study } from '../../models/study.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditStudyDialogComponent } from '../dialogs/edit-study-dialog/edit-study-dialog.component';
import { DeleteStudyDialogComponent } from '../dialogs/delete-study-dialog/delete-study-dialog.component';

@Component({
  selector: 'app-study-catalog-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EditButtonComponent,
    DeleteButtonComponent,
    DeleteStudyDialogComponent,
    MatDialogModule
  ],
  templateUrl: './study-catalog-list.component.html',
  styleUrls: ['./study-catalog-list.component.scss']
})
export class StudyCatalogListComponent implements OnInit {
  fullList: Study[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private studyService: StudyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.studyService.getStudies().subscribe(data => {
      this.fullList = data;
    });
  }

  get filteredList(): Study[] {
    const term = this.searchTerm.toLowerCase();
    return this.fullList.filter(
      item =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }

  get paginatedList(): Study[] {
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

  onEdit(item: Study): void {
    this.dialog.open(EditStudyDialogComponent, {
      data: item
    });
  }

  onDelete(item: Study): void {
    const dialogRef = this.dialog.open(DeleteStudyDialogComponent, {
      data: {
        study: item,
        title: 'Eliminar Estudio',
        message: `¿Estás seguro de que deseas eliminar "${item.title}"?`,
        image: 'trash-01.png'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Estudio eliminado');
      }
    });
  }
}

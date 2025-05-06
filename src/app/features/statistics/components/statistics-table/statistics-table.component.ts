import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistic } from './models/stats.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-statistics-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-table.component.html',
  styleUrls: ['./statistics-table.component.scss']
})
export class StatisticsTableComponent implements OnInit {
  @Input() statistics: Statistic[] = [];
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 0;
  
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  
  paginatedStatistics: Statistic[] = [];
  totalPages: number = 0;
  
  constructor(private router:Router) { }
  
  ngOnInit(): void {
    this.updatePaginatedData();
  }
  
  ngOnChanges(): void {
    this.updatePaginatedData();
  }
  
  updatePaginatedData(): void {
    this.totalPages = Math.ceil(this.statistics.length / this.pageSize);
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedStatistics = this.statistics.slice(startIndex, startIndex + this.pageSize);
  }
  
  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.previousPage.emit();
    }
  }
  
  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.nextPage.emit();
    }
  }

navigateToChart(statisticId: string): void {
  this.router.navigate(['/statistics', statisticId]);
}
}
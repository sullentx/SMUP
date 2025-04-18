import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Medication } from '../../models/medication.model';
@Component({
  selector: 'app-medication-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './medication-table.component.html',
  styleUrls: ['./medication-table.component.scss']
})
export class MedicationTableComponent {
  @Input() medications: Medication[] = [];
  @Input() displayedColumns: string[] = ['code', 'name', 'description', 'stock', 'actions'];
  @Input() currentPage = 0;
  @Input() totalPages = 1;
  
  @Output() edit = new EventEmitter<Medication>();
  @Output() delete = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Medication } from '../../../models/medication.model';
import { MedicationService } from '../../../service/medication.service';
import { MedicationTableComponent } from '../../medication-table/medication-table.component';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { AddButtonComponent } from '../../buttons/add-button/add-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-medication-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MedicationTableComponent,
    AddButtonComponent,
    BackButtonComponent,
    MatMenuModule,
    MatButton
  ],
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss']
})
export class MedicationListComponent implements OnInit {
  allMedications: Medication[] = [];
  displayedMedications: Medication[] = [];
  searchTerm = '';
  currentPage = 0;
  pageSize = 5;
  totalPages = 1;
  sortCriteria = 'name';
  filterCriteria = 'all';
  
  constructor(
    private medicationService: MedicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications(): void {
    this.medicationService.getMedications().subscribe(medications => {
      this.allMedications = medications;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = this.allMedications;
    
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(med => 
        med.code.toLowerCase().includes(search) || 
        med.name.toLowerCase().includes(search)
      );
    }
    
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    
    const startIndex = this.currentPage * this.pageSize;
    this.displayedMedications = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  onSearch(): void {
    this.currentPage = 0;
    this.applyFilters();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyFilters();
    }
  }

  onAddMedication(): void {
    // Por ahora solo mostrará un mensaje
    alert('Función para agregar medicamento');
    // Posteriormente: this.router.navigate(['medications', 'new']);
  }

  onEditMedication(medication: Medication): void {
    // Por ahora solo mostrará un mensaje
    alert(`Editar medicamento: ${medication.name}`);
    // Posteriormente: this.router.navigate(['medications', medication.id]);
  }

  onDeleteMedication(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Está seguro que desea eliminar este medicamento?')) {
      this.medicationService.deleteMedication(id).subscribe(success => {
        if (success) {
          this.loadMedications();
        }
      });
    }
  }
  
  onSortChange(): void {
    this.currentPage = 0;
    this.applyFilters();
  }
  
  onFilterChange(): void {
    this.currentPage = 0;
    this.applyFilters();
  }

  onBack(): void {
    // Por ahora solo volveremos al inicio
    this.router.navigate(['/']);
  }

  sortBy(criteria: string): void {
    this.sortCriteria = criteria;
    this.onSortChange();
  }
  
  filterBy(criteria: string): void {
    this.filterCriteria = criteria;
    this.onFilterChange();
  }
  
  // Para verificar si hay filtros activos (opcional)
  isSortActive(): boolean {
    return this.sortCriteria !== 'name'; // Asumiendo que 'name' es el valor predeterminado
  }
  
  isFilterActive(): boolean {
    return this.filterCriteria !== 'all'; // Asumiendo que 'all' es el valor predeterminado
  }
}
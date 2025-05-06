// alumnos-page.component.ts
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
interface Alumno {
  id: number;
  matricula: string;
  nombres: string;
  correo: string;
  carrera: string;
  fechaNacimiento: Date;
}

@Component({
  selector: 'app-alumnos-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    BackButtonComponent
  ],
  templateUrl: './alumnos-page.component.html',
  styleUrls: ['./alumnos-page.component.scss']
})
export class AlumnosPageComponent implements OnInit {
  displayedColumns: string[] = ['matricula', 'nombres', 'carrera', 'fechaNacimiento'];
  dataSource = new MatTableDataSource<Alumno>([]);
  searchTerm = '';
  sortCriteria = 'nombres';
  filterCriteria = 'all';
  
  originalData: Alumno[] = [];

    @Input() currentPage = 0;
    @Input() totalPages = 1;

    @Output() nextPage = new EventEmitter<void>();
    @Output() previousPage = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.loadAlumnos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAlumnos(): void {
    this.originalData = [
      { id: 1, matricula: '0123456', nombres: 'Juan Pérez', correo: 'juan.perez@email.com', carrera: 'Ingeniería de Software', fechaNacimiento: new Date(1998, 5, 15) },
      { id: 2, matricula: '0123457', nombres: 'María López', correo: 'maria.lopez@email.com', carrera: 'Ingeniería de Software', fechaNacimiento: new Date(1999, 3, 22) },
      { id: 3, matricula: '0123458', nombres: 'Carlos Rodríguez', correo: 'carlos.rodriguez@email.com', carrera: 'Ingeniería de Software', fechaNacimiento: new Date(1997, 8, 10) },
      { id: 4, matricula: '0123459', nombres: 'Ana Martínez', correo: 'ana.martinez@email.com', carrera: 'Ingeniería Civil', fechaNacimiento: new Date(2000, 1, 5) },
      { id: 5, matricula: '0123460', nombres: 'Pedro Sánchez', correo: 'pedro.sanchez@email.com', carrera: 'Ingeniería de Software', fechaNacimiento: new Date(1999, 6, 18) }
    ];
    this.dataSource.data = [...this.originalData];
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.applyFiltersAndSort();
      return;
    }
    
    const searchTermLower = this.searchTerm.toLowerCase();
    const filteredData = this.originalData.filter(alumno => 
      alumno.matricula.toLowerCase().includes(searchTermLower) ||
      alumno.nombres.toLowerCase().includes(searchTermLower) ||
      alumno.correo.toLowerCase().includes(searchTermLower) ||
      alumno.carrera.toLowerCase().includes(searchTermLower)
    );
    
    this.dataSource.data = filteredData;
    this.applyFiltersAndSort(filteredData);
  }

  sortBy(criteria: string): void {
    this.sortCriteria = criteria;
    this.applyFiltersAndSort();
  }

  filterBy(criteria: string): void {
    this.filterCriteria = criteria;
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(data: Alumno[] = this.originalData): void {
    let filteredData = [...data];
    
    if (this.filterCriteria !== 'all') {
      filteredData = filteredData.filter(alumno => {
        switch (this.filterCriteria) {
          case 'ingenieria':
          default:
            return true;
        }
      });
    }
    
    filteredData.sort((a, b) => {
      switch (this.sortCriteria) {
        case 'matricula':
          return a.matricula.localeCompare(b.matricula);
        case 'nombres':
          return a.nombres.localeCompare(b.nombres);
        case 'carrera':
          return a.carrera.localeCompare(b.carrera);
        case 'fechaNacimiento':
          return a.fechaNacimiento.getTime() - b.fechaNacimiento.getTime();
        default:
          return 0;
      }
    });
    
    this.dataSource.data = filteredData;
  }


  onBack(): void {
    window.history.back();
  }
}
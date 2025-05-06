import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule,
    MatDividerModule
  ]
})
export class SidebarComponent implements OnChanges{
  @Input() isExpanded = true;
  @Output() closeSidenav = new EventEmitter<void>();

  menuItems = [
    {
      name: 'Registros',
      iconType: 'image',
      imgSrc: '/user-circle.png',
      children: [
        { name: 'Alumnos', route: '/registros/alumnos' },
        { name: 'Personal externo', route: '/registros/externo' },
        { name: 'Personal UP', route: '/registros/up' },
        { name: 'Pasantes', route: '/registros/pasantes' }
      ]
    },
    { name: 'Medicamentos', iconType: 'image', imgSrc: '/medical-circle.png', route: '/medications' },    
    { name: 'Catálogos', iconType: 'image', imgSrc: '/folder.png', route: '/proyectos' },  
    { name: 'Cuentas', iconType: 'image', imgSrc: '/user-plus-01.png', route: '/proyectos' },    
    { name: 'Estadísticas', iconType: 'image', imgSrc: '/file-07.png', route: '/statistics' },  
    { name: 'Encuestas', iconType: 'image', imgSrc: '/file-attachment-04.png', route: '/surveys' },    
  
  ];
  

  bottomMenuItems = [
    { name: 'Configuración', icon: 'settings', iconType: 'material', route: '/configuracion' },
  ]
  onCloseSidenav(): void {
    this.closeSidenav.emit();
  
  }

  expandedItem: string | null = null;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isExpanded'] && !changes['isExpanded'].currentValue) {
      this.expandedItem = null;
    }
  }


  toggleSubMenu(name: string): void {
    if (!this.isExpanded) {
      return;
    }
    
    this.expandedItem = this.expandedItem === name ? null : name;
  }

}

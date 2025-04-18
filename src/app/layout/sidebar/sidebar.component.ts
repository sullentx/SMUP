import { Component, Output, EventEmitter, Input } from '@angular/core';
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
export class SidebarComponent {
  @Input() isExpanded = true;
  @Output() closeSidenav = new EventEmitter<void>();

  menuItems = [
    { name: 'Registros', iconType: 'image', imgSrc: '/user-circle.png', route: '/proyectos' },    
    { name: 'Medicamentos', iconType: 'image', imgSrc: '/medical-circle.png', route: '/proyectos' },    
    { name: 'Catálogos', iconType: 'image', imgSrc: '/folder.png', route: '/proyectos' },  
    { name: 'Cuentas', iconType: 'image', imgSrc: '/user-plus-01.png', route: '/proyectos' },    
    { name: 'Estadísticas', iconType: 'image', imgSrc: '/file-07.png', route: '/proyectos' },    
  ];

  bottomMenuItems = [
    { name: 'Configuración', icon: 'settings', iconType: 'material', route: '/configuracion' },
  ]
  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }
}

import { Component } from '@angular/core';
import { MatCommonModule, MatLineModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { DialogService } from '../../shared/services/dialog.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
    imports: [MatCommonModule, SidebarComponent, 
        MatLineModule,
        RouterOutlet,MatToolbarModule,MatSidenavModule,CommonModule, MatButtonModule,MatIconModule],
})
export class MainLayoutComponent {
  sidenavExpanded = true;
  userName = 'Eduardo Uriel'; 
  constructor(private dialogService: DialogService,
    private router: Router
  ){}
  toggleSidenav() {
    this.sidenavExpanded = !this.sidenavExpanded;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300); 
  }

  showHelpDialog(): void {
    this.dialogService.showHelp('Manual de Usuario SMUP.PDF','Tipo de archivo: PDF   /   Tamaño archivo: 351 KB');
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}

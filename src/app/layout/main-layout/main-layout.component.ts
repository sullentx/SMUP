import { Component } from '@angular/core';
import { MatCommonModule, MatLineModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
    imports: [MatCommonModule, SidebarComponent, 
        MatLineModule,
        RouterOutlet,MatToolbarModule,MatSidenavModule,CommonModule, MatButton],
})
export class MainLayoutComponent {
  sidenavExpanded = true;
  userName = 'Eduardo Uriel'; 
  toggleSidenav(): void {
    this.sidenavExpanded = !this.sidenavExpanded;
  }
}

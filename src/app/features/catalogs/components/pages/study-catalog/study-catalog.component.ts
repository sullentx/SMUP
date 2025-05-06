import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { StudyCatalogListComponent } from '../../study-catalog-list/study-catalog-list.component';
import { NewStudyDialogComponent } from '../../dialogs/new-study-dialog/new-study-dialog.component';

@Component({
  selector: 'app-study-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    BackButtonComponent,
    StudyCatalogListComponent,
    NewStudyDialogComponent 
  ],
  templateUrl: './study-catalog.component.html',
  styleUrls: ['./study-catalog.component.scss']
})
export class StudyCatalogPageComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  openNewStudyDialog(): void {
    const dialogRef = this.dialog.open(NewStudyDialogComponent, {
      width: '800px',
      height: '500px',
      disableClose: true, 
      autoFocus: false     
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Estudio guardado:', result);
      }
    });
  }
  
}

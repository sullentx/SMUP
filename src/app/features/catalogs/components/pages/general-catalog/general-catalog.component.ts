import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { GeneralCatalogListComponent } from '../../general-catalog-list/general-catalog-list.component';
import { NewCatalogDialogComponent } from '../../dialogs/new-catalog-dialog/new-catalog-dialog.component';

@Component({
  selector: 'app-general-catalog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    BackButtonComponent,
    GeneralCatalogListComponent,
    NewCatalogDialogComponent
  ],
  templateUrl: './general-catalog.component.html',
  styleUrls: ['./general-catalog.component.scss']
})
export class GeneralCatalogPageComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  openNewCatalogDialog(): void {
    const dialogRef = this.dialog.open(NewCatalogDialogComponent, {
      width: '800px',
      height: '500px',
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Catálogo guardado:', result);
      }
    });
  }
}

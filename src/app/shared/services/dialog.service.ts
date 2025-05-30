import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmationDialogComponent } from '../components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../components/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { HelpDialogComponent } from '../components/dialogs/help-dialog/help-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  /**
   * Muestra un diálogo de confirmación
   * @param message Mensaje de confirmación
   * @param title Título opcional
   * @returns Observable con el resultado (true si se confirma, false si se cancela)
   */
  confirm(message: string, title: string = 'Confirmar acción', image?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '95vw',
      maxWidth: '1300px',
      height: '120px',
      disableClose: true,
      autoFocus: false,
      data: { title, message,image }
    });

    return dialogRef.afterClosed();
  }
/**
 * Muestra un diálogo de éxito en formato toast
 * @param message Mensaje de éxito
 * @param title Título opcional
 * @param image Ruta de la imagen a mostrar (opcional)
 * @param duration Duración en ms antes de autocerrar (por defecto 5000ms)
 */
success(message: string, title: string = '¡Éxito!', image?: string, duration = 5000): void {
  this.dialog.open(SuccessDialogComponent, {
    width: '40vw',
    height: 'auto',
    position: { bottom: '20px' },
    panelClass: ['success-toast-dialog', 'transparent-backdrop'],
    hasBackdrop: false, 
    disableClose: true, 
    data: { title, message, image, duration }
  });
}

  /**
   * Muestra un diálogo de error
   * @param message Mensaje de error
   * @param title Título opcional
   */
  error(message: string, title: string = 'Error', image?: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '95vw',
      maxWidth: '1300px',
      height: '120px',
      disableClose: true,
      autoFocus: false,
      data: { title, message, image }
    });
  }

  // En dialog.service.ts
/**
 * Muestra un diálogo de ayuda
 * @param title Título del diálogo
 */
showHelp(title: string = 'Ayuda', data:string): void {
  this.dialog.open(HelpDialogComponent, {
    width: '65vw',
    maxWidth: '760px',
    height: '100px', 
    disableClose: false,
    autoFocus: false,
    hasBackdrop: false,  
    panelClass: 'custom-dialog-container',
    position: { right: '10' },
    data: { title, data } 
  });
}



}
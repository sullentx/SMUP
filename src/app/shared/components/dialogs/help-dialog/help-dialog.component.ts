// help-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-help-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss']
})
export class HelpDialogComponent {
  // Nueva propiedad para controlar estado de descarga
  downloadState: 'initial' | 'success' = 'initial';

  constructor(
    public dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string;
      data?: string;
      manualUrl?: string;
    }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  downloadManual(): void {
    // Utiliza la URL proporcionada o una predeterminada
    const url = this.data.manualUrl || '/assets/manual.pdf';
    
    // Crear un elemento <a> temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'manual-usuario-smup.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cambiar el estado a éxito
    this.downloadState = 'success';
    
    // Opcionalmente: volver al estado inicial después de un tiempo
    setTimeout(() => {
      this.downloadState = 'initial';
    }, 3000); // Volver al estado inicial después de 3 segundos
  }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-raised-button color="primary" (click)="clicked.emit()">
      <mat-icon>add</mat-icon>
      Agregar Medicamento
    </button>
  `,
  styles: []
})
export class AddButtonComponent {
  @Output() clicked = new EventEmitter<void>();
}
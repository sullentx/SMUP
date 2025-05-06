import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button mat-button (click)="clicked.emit()">
      <mat-icon>arrow_back</mat-icon>
      Volver
    </button>
  `,
  styles: []
})
export class BackButtonComponent {
  @Output() clicked = new EventEmitter<void>();
}
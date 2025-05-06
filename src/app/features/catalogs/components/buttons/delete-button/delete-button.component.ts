import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <button mat-icon-button (click)="clicked.emit()">
      <img [src]="iconSrc" alt="delete icon" />
    </button>
  `,
  styles: [`
button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #353895 !important;
  color: white !important;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px; /* Espacio entre botones */
}

img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

  `]
})
export class DeleteButtonComponent {
  @Input() iconSrc: string = 'trash-01.png';
  @Output() clicked = new EventEmitter<void>();
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <button  (click)="clicked.emit()">
      <img src="plus.png" alt="icon">
      Agregar 
    </button>
  `,
  styleUrls: ['./add.scss']
})
export class AddButtonComponent {
  @Output() clicked = new EventEmitter<void>();
}
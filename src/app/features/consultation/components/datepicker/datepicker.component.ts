import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatNativeDateModule
  ]
})
export class DatepickerComponent {
  @Input() required = false;
  @Input() showError = false;
  @Output() dateSelected = new EventEmitter<Date>();

  onDateChange(event: any): void {
    this.dateSelected.emit(event.value);
  }
}

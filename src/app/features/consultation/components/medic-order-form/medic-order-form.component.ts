import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
  selector: 'app-medic-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    DatepickerComponent
  ],
  templateUrl: './medic-order-form.component.html',
  styleUrls: ['./medic-order-form.component.scss']
})
export class MedicOrderFormComponent {
  form: FormGroup;
  estudios = ['Rayos X', 'Ultrasonido', 'Resonancia Magnética', 'Laboratorio'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paciente: ['', Validators.required],
      personalSalud: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      fechaEstudio: ['', Validators.required],
      tipoEstudio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
}

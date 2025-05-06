import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medic-intervention-form',
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
  templateUrl: './medic-intervention-form.component.html',
  styleUrls: ['./medic-intervention-form.component.scss']
})
export class MedicInterventionFormComponent {
  form: FormGroup;
  tiposIntervencion = ['Cirugía menor', 'Aplicación de medicamento', 'Curación', 'Otro'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paciente: ['', Validators.required],
      personalSalud: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      fechaIntervencion: ['', Validators.required],
      tipoIntervencion: ['', Validators.required],
      descripcionIntervencion: ['', Validators.required],
    });
  }

  getFormValue() {
    return this.form.value;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-canalization-form',
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
  templateUrl: './canalization-form.component.html',
  styleUrls: ['./canalization-form.component.scss']
})
export class CanalizationFormComponent {
  form: FormGroup;
  especialidades = ['Cardiología', 'Pediatría', 'Neurología', 'Dermatología'];
  areas: string[] = ['Área 1', 'Área 2', 'Área 3', 'Área 4'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paciente: ['', Validators.required],
      personalSalud: ['', Validators.required],
      motivo: ['', Validators.required],
      unidadCanalizada: ['', Validators.required],
      especialidad: ['', Validators.required],
      fechaCanalizacion: ['', Validators.required]
    });
  }

  resetForm(): void {
    this.form.reset();
  }

  save(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
    }
  }
}

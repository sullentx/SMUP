import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
  selector: 'app-medic-order-register-form',
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
  templateUrl: './medic-order-register-form.component.html',
  styleUrls: ['./medic-order-register-form.component.scss']
})
export class MedicOrderRegisterFormComponent {
  form: FormGroup;
  consultas = ['Consulta 001', 'Consulta 002'];
  laboratorios = ['Lab A', 'Lab B'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idConsulta: ['', Validators.required],
      idEstudio: ['', Validators.required],
      personalSalud: ['', Validators.required],
      idResultado: ['', Validators.required],
      laboratorio: ['', Validators.required],
      resultado: ['', Validators.required],
      fechaResultado: ['', Validators.required]
    });
  }

  getFormValues() {
    return this.form.value;
  }
}

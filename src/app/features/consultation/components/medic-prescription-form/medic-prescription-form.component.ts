import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { MedicPrescription } from '../../models/medic-prescription.model';

@Component({
  selector: 'app-medic-prescription-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    DatepickerComponent
  ],
  templateUrl: './medic-prescription-form.component.html',
  styleUrls: ['./medic-prescription-form.component.scss']
})
export class MedicPrescriptionFormComponent {
  form: FormGroup;
  medicamentos = ['Paracetamol', 'Ibuprofeno', 'Amoxicilina', 'Otro'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      paciente: ['', Validators.required],
      personalSalud: ['', Validators.required],
      fechaConsulta: ['', Validators.required],
      horaInicio: ['', Validators.required],
      medicamento: ['', Validators.required],
      dosis: ['', Validators.required],
      frecuencia: ['', Validators.required],
      notas: ['']
    });
  }

  getFormValues(): MedicPrescription {
    return this.form.value;
  }
}

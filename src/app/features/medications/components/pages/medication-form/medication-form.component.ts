import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MedicationService } from '../../../service/medication.service';
import { Medication } from '../../../models/medication.model';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from '../../../../../shared/services/dialog.service';
@Component({
  selector: 'app-medication-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackButtonComponent,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './medication-form.component.html',
  styleUrl: './medication-form.component.scss'
})
export class MedicationFormComponent implements OnInit {
  medicationForm: FormGroup;
  isEditing = false;
  title = 'Agregar nuevo medicamento';
  submitButtonText = 'Guardar';
  
  codeFocused = false;
  nameFocused = false;
  stockFocused = false;
  laboratoryFocused = false;
  dosageFocused = false;
  typeFocused = false;

  constructor(
    private formBuilder: FormBuilder,
    private medicationService: MedicationService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.medicationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
      laboratory: ['', [Validators.required]],
      dosage: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.title = 'Editar Medicamento';
      this.submitButtonText = 'Guardar';
      
      this.medicationService.getMedication(Number(id)).subscribe(medication => {
        if (medication) {
          this.medicationForm.patchValue(medication);
        } else {
          this.router.navigate(['/medications']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.medicationForm.invalid) {
      this.medicationForm.markAllAsTouched();
      return;
    }

    const medicationData: Medication = this.medicationForm.value;

    if (this.isEditing) {
      const id = this.route.snapshot.paramMap.get('id');
      medicationData.id = Number(id);

      this.medicationService.updateMedication(medicationData).subscribe(result => {
        if (result.success) {
          this.dialogService.success(
            'Se ha actualizado correctamente',
            'Medicamento actualizado',
            '/palomita.png'
          );
          this.router.navigate(['/medications']);
        } else {
          this.dialogService.error(
            '¡No se puede actualizar!',
            'Complete todos los campos obligatorios para poder guardar.',
            '/error.png'
          );
        }
      });
    } else {
      this.medicationService.addMedication(medicationData).subscribe(() => {
        this.dialogService.success(
          '¡Medicamento agregado!',
          'Se ha guardado correctamente.',
          '/palomita.png'
        );
        this.router.navigate(['/medications']);
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/medications']);
  }

  get formControls() {
    return this.medicationForm.controls;
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.formControls[fieldName];
    return field?.invalid && (field?.dirty || field?.touched);
  }
}
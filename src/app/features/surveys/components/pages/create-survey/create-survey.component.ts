import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../../shared/services/dialog.service';
@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.surveyForm = this.createForm();
  }
  
  ngOnInit(): void {
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    }, { validators: this.dateRangeValidator });
  }
  
  dateRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    
    if (start && end && new Date(start) > new Date(end)) {
      group.get('endDate')?.setErrors({ dateRange: true });
      return { dateRange: true };
    }
    
    return null;
  }
  
  onSave(): void {
    if (this.surveyForm.valid) {
      console.log('Formulario enviado:', this.surveyForm.value);
      
      setTimeout(() => {
        this.dialogService.success(
          'La encuesta ha sido creada correctamente.',
          'Encuesta Creada',
          '/palomita.png'
        );
        this.router.navigate(['/surveys']);
      }, 500);
    } else {
      Object.keys(this.surveyForm.controls).forEach(field => {
        const control = this.surveyForm.get(field);
        control?.markAsTouched();
      });
      
      this.dialogService.error(
        'Por favor, revisa los campos del formulario e inténtalo de nuevo.',
        'Error de validación',
        '/error.png'
      );
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/surveys']);
  }
  
  onBack(): void {
    this.router.navigate(['/surveys']);
  }
}
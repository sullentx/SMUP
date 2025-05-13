import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { ConsultationFormComponent } from '../../consultation-form/consultation-form.component';
import { ConsultationService } from '../../../service/medic-consultation.service';
import { Consultation } from '../../../models/medic-consultation.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-medic-consultation-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    ConsultationFormComponent
  ],
  templateUrl: './medic-consultation.component.html',
  styleUrls: ['./medic-consultation.component.scss']
})
export class ConsultationPageComponent {
  @ViewChild(ConsultationFormComponent) formComponent!: ConsultationFormComponent;

  constructor(
    private router: Router,
    private consultationService: ConsultationService
  ) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onCanalizar(): void {
    this.router.navigate(['/medic-canalization']);
  }

  onReceta(): void {
    this.router.navigate(['/medic-prescription']);

  }
  
  onFinalizar(): void {
    if (this.formComponent.form.valid) {
      const formValues: Consultation = this.formComponent.form.value;
      this.consultationService.setConsultation(formValues);
      console.log('Consulta finalizada:', formValues);
    } else {
      this.formComponent.form.markAllAsTouched();
    }
  }
  
}

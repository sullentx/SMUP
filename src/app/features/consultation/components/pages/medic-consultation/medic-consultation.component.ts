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
    this.router.navigate(['/medic-consultation']);
  }

  onCanalizar(): void {
    this.router.navigate(['/medic-canalization']);
  }

  onReceta(): void {
    if (this.formComponent.form.valid) {
      const formValues: Consultation = this.formComponent.form.value;

      this.consultationService.setConsultation(formValues);

      const doc = new jsPDF();
      const imgUrl = 'prescription-pdf-2.jpg'; 
      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        doc.addImage(img, 'PNG', 0, 0, 210, 297);
        doc.setFontSize(18);
        doc.text('Consulta Médica', 10, 60);
        doc.setFontSize(12);
        doc.text(`Paciente: ${formValues.paciente}`, 10, 80);
        doc.text(`Personal de Salud: ${formValues.personalSalud}`, 10, 90);
        const fechaConsulta = formValues.fechaConsulta ? new Date(formValues.fechaConsulta).toLocaleDateString() : 'No disponible';
        doc.text(`Fecha de Consulta: ${fechaConsulta}`, 10, 100);
        doc.text(`Hora de Inicio: ${formValues.horaInicio}`, 10, 110);
        doc.text(`Hora de Fin: ${formValues.horaFin}`, 10, 120);
        doc.text(`Diagnóstico: ${formValues.diagnostico}`, 10, 130);
        doc.text(`Categoría: ${formValues.categoria}`, 10, 140);

        doc.save('consulta-medica.pdf');
        console.log('Consulta guardada:', formValues);

        this.router.navigate(['/medic-prescription']);
      };
    } else {
      this.formComponent.form.markAllAsTouched();
    }
  }
}

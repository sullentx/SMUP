import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { MedicPrescriptionFormComponent } from '../../medic-prescription-form/medic-prescription-form.component';
import { PrescriptionService } from '../../../service/medic-prescription.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-medic-prescription-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    MedicPrescriptionFormComponent
  ],
  templateUrl: './medic-prescription.component.html',
  styleUrls: ['./medic-prescription.component.scss']
})
export class MedicPrescriptionPageComponent {
  @ViewChild(MedicPrescriptionFormComponent)
  formComponent!: MedicPrescriptionFormComponent;

  constructor(
    private router: Router,
    private prescriptionService: PrescriptionService
  ) {}

  onBack(): void {
    this.router.navigate(['/medic-prescription']);
  }

  onGenerarPrescripcion(): void {
    if (!this.formComponent?.form || this.formComponent.form.invalid) {
      this.formComponent.form.markAllAsTouched();
      return;
    }

    const formValues = this.formComponent.getFormValues();
    this.prescriptionService.addPrescription(formValues);

    const doc = new jsPDF();
    const imgUrl = 'prescription-pdf-2.jpg'; 
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      doc.addImage(img, 'PNG', 0, 0, 210, 297);
      doc.setFontSize(18);
      doc.text('Receta Médica', 10, 60);
      doc.setFontSize(12);
      doc.text(`Paciente: ${formValues.paciente}`, 10, 80);
      doc.text(`Personal de Salud: ${formValues.personalSalud}`, 10, 90);
      const fechaConsulta = formValues.fechaConsulta ? new Date(formValues.fechaConsulta).toLocaleDateString() : 'No disponible';
      doc.text(`Fecha de Consulta: ${fechaConsulta}`, 10, 100);
      doc.text(`Hora de Inicio: ${formValues.horaInicio}`, 10, 110);
      doc.text(`Medicamento: ${formValues.medicamento}`, 10, 120);
      doc.text(`Dosis: ${formValues.dosis}`, 10, 130);
      doc.text(`Frecuencia: ${formValues.frecuencia}`, 10, 140);
      doc.text(`Notas: ${formValues.notas || 'Ninguna'}`, 10, 150);

      doc.save('receta-medica.pdf');
      this.formComponent.form.reset();
    };
  }
}

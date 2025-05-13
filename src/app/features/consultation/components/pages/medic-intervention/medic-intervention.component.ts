import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MedicInterventionFormComponent } from '../../medic-intervention-form/medic-intervention-form.component';
import { BackButtonComponent } from '../../buttons/back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MedicInterventionService } from '../../../service/medic-intervention.service';
import { MedicIntervention } from '../../../models/medic-intervention.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-medic-intervention-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BackButtonComponent,
    MedicInterventionFormComponent  
  ],
  templateUrl: './medic-intervention.component.html',
  styleUrls: ['./medic-intervention.component.scss']
})
export class MedicInterventionPageComponent {
  @ViewChild(MedicInterventionFormComponent) formComponent!: MedicInterventionFormComponent;

  constructor(
    private router: Router,
    private interventionService: MedicInterventionService
  ) {}

  onBack(): void {
    this.router.navigate(['/home']);
  }

  onCanalizar(): void {
    this.router.navigate(['/medic-canalization']);
  }

  onReceta(): void {
    if (this.formComponent.form.valid) {
      const formValues: MedicIntervention = this.formComponent.form.value;
      
      this.interventionService.addIntervention(formValues);

      const doc = new jsPDF();
      const imgUrl = 'prescription-pdf-2.jpg'; 
      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        doc.addImage(img, 'PNG', 0, 0, 210, 297);
        doc.setFontSize(18);
        doc.text('Intervención Médica', 10, 60);
        doc.setFontSize(12);
        doc.text(`Paciente: ${formValues.paciente}`, 10, 80);
        doc.text(`Personal de Salud: ${formValues.personalSalud}`, 10, 90);
        doc.text(`Fecha de Consulta: ${formValues.fechaConsulta.toLocaleDateString()}`, 10, 100);
        doc.text(`Hora de Inicio: ${formValues.horaInicio}`, 10, 110);
        doc.text(`Hora de Fin: ${formValues.horaFin}`, 10, 120);
        doc.text(`Fecha de Intervención: ${formValues.fechaIntervencion.toLocaleDateString()}`, 10, 130);
        doc.text(`Tipo de Intervención: ${formValues.tipoIntervencion}`, 10, 140);
        doc.text(`Descripción de la Intervención: ${formValues.descripcionIntervencion}`, 10, 150);

        doc.save('intervencion-medica.pdf');
        console.log('Intervención médica guardada:', formValues);
      };
    } else {
      this.formComponent.form.markAllAsTouched();
    }
  }
}

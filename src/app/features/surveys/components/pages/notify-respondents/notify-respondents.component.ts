import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../../shared/services/dialog.service';

interface Respondent {
  id: string;
  name: string;
  email: string;
  career: string;
}

@Component({
  selector: 'app-notify-respondents',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './notify-respondents.component.html',
  styleUrls: ['./notify-respondents.component.scss']
})
export class NotifyRespondentsComponent implements OnInit {
  surveyId: string = '';
  surveyTitle: string = '';
  respondents: Respondent[] = [];
  filteredRespondents: Respondent[] = [];
  selectedRespondentIds: string[] = [];
  allRespondentsSelected: boolean = false;
  searchTerm: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.surveyId = params['surveyId'];
      this.loadSurveyDetails();
      this.loadRespondents();
    });
  }
  
  loadSurveyDetails(): void {
    const surveyTitles: {[key: string]: string} = {
      '1': 'Encuesta de Satisfacción Estudiantil 2023',
      '2': 'Evaluación de Servicios Médicos',
      '3': 'Calidad de Instalaciones',
      '4': 'Evaluación de Profesores'
    };
    
    this.surveyTitle = surveyTitles[this.surveyId] || 'Encuesta Seleccionada';
  }
  
  loadRespondents(): void {
    this.respondents = [
      {
        id: '001',
        name: 'Juan Pérez González',
        email: 'juan.perez@universidad.edu',
        career: 'Ingeniería en Sistemas'
      },
      {
        id: '002',
        name: 'María Rodríguez López',
        email: 'maria.rodriguez@universidad.edu',
        career: 'Medicina'
      },
      {
        id: '003',
        name: 'Carlos Sánchez Martínez',
        email: 'carlos.sanchez@universidad.edu',
        career: 'Administración de Empresas'
      },
      {
        id: '004',
        name: 'Ana Gómez Fernández',
        email: 'ana.gomez@universidad.edu',
        career: 'Psicología'
      },
      {
        id: '005',
        name: 'Roberto Torres Díaz',
        email: 'roberto.torres@universidad.edu',
        career: 'Ingeniería Civil'
      },
      {
        id: '006',
        name: 'Laura Ramírez Castro',
        email: 'laura.ramirez@universidad.edu',
        career: 'Derecho'
      },
      {
        id: '007',
        name: 'Miguel Ángel Flores Ortiz',
        email: 'miguel.flores@universidad.edu',
        career: 'Contabilidad'
      }
    ];
    
    this.filterRespondents();
  }
  
  filterRespondents(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRespondents = [...this.respondents];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredRespondents = this.respondents.filter(respondent => 
      respondent.name.toLowerCase().includes(term) || 
      respondent.email.toLowerCase().includes(term) ||
      respondent.career.toLowerCase().includes(term) ||
      respondent.id.toLowerCase().includes(term)
    );
  }
  
  toggleRespondentSelection(respondentId: string): void {
    const index = this.selectedRespondentIds.indexOf(respondentId);
    
    if (index === -1) {
      this.selectedRespondentIds.push(respondentId);
    } else {
      this.selectedRespondentIds.splice(index, 1);
    }
    
    this.updateAllSelectedState();
  }
  
  isRespondentSelected(respondentId: string): boolean {
    return this.selectedRespondentIds.includes(respondentId);
  }
  
  toggleSelectAll(): void {
    if (this.allRespondentsSelected) {
      this.selectedRespondentIds = [];
    } else {
      this.selectedRespondentIds = this.filteredRespondents.map(r => r.id);
    }
    
    this.allRespondentsSelected = !this.allRespondentsSelected;
  }
  
  updateAllSelectedState(): void {
    this.allRespondentsSelected = 
      this.filteredRespondents.length > 0 && 
      this.filteredRespondents.every(r => this.selectedRespondentIds.includes(r.id));
  }
  
  hasSelectedRespondents(): boolean {
    return this.selectedRespondentIds.length > 0;
  }
  
  onNotify(): void {
    if (this.selectedRespondentIds.length === 0) {
      this.dialogService.error(
        'Debes seleccionar al menos un encuestado para enviar notificación.',
        'Sin selección',
        '/error.png'
      );
      return;
    }
    
    const selectedRespondents = this.respondents.filter(r => 
      this.selectedRespondentIds.includes(r.id)
    );
    
    console.log('Enviando notificaciones a:', selectedRespondents);
    
    this.dialogService.success(
      `Se han enviado notificaciones a ${selectedRespondents.length} encuestados correctamente.`,
      'Notificación Enviada',
      '/palomita.png'
    );
    
    this.selectedRespondentIds = [];
    this.allRespondentsSelected = false;
  }
  
  onBack(): void {
    this.router.navigate(['/surveys/select-survey']);
  }

  onCancel(): void {
    this.router.navigate(['/surveys/select-survey']);
  }
}
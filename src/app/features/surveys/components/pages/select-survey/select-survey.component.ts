import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../../shared/services/dialog.service';

interface Survey {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  respondentsCount: number;
}

@Component({
  selector: 'app-select-survey',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './select-survey.component.html',
  styleUrls: ['./select-survey.component.scss']
})
export class SelectSurveyComponent implements OnInit {
  surveys: Survey[] = [];
  filteredSurveys: Survey[] = [];
  selectedSurveyId: string | null = null;
  searchTerm: string = '';
  
  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {}
  
  ngOnInit(): void {
    this.loadSurveys();
  }
  
  loadSurveys(): void {
    this.surveys = [
      {
        id: '1',
        title: 'Encuesta de Satisfacción Estudiantil 2023',
        description: 'Encuesta para medir la satisfacción de los estudiantes con los servicios universitarios y la calidad de la enseñanza.',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        respondentsCount: 152
      },
      {
        id: '2',
        title: 'Evaluación de Servicios Médicos',
        description: 'Encuesta para evaluar la calidad de los servicios médicos ofrecidos a los estudiantes y personal de la universidad.',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-30'),
        respondentsCount: 87
      },
      {
        id: '3',
        title: 'Calidad de Instalaciones',
        description: 'Encuesta para evaluar el estado de las instalaciones universitarias, incluyendo aulas, laboratorios y espacios comunes.',
        startDate: new Date(Date.now() + 86400000 * 10), // 10 días en el futuro
        endDate: new Date(Date.now() + 86400000 * 40), // 40 días en el futuro
        respondentsCount: 120
      },
      {
        id: '12',
        title: 'Evaluación de Profesores',
        description: 'Encuesta para evaluar el desempeño de los profesores durante el semestre actual.',
        startDate: new Date('2023-06-15'),
        endDate: new Date('2023-07-15'),
        respondentsCount: 243
      },
         {
        id: '11',
        title: 'Encuesta de Satisfacción Estudiantil 2023',
        description: 'Encuesta para medir la satisfacción de los estudiantes con los servicios universitarios y la calidad de la enseñanza.',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        respondentsCount: 152
      },
      {
        id: '10',
        title: 'Encuesta de Satisfacción Estudiantil 2023',
        description: 'Encuesta para medir la satisfacción de los estudiantes con los servicios universitarios y la calidad de la enseñanza.',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        respondentsCount: 152
      },
    ];
    
    this.filteredSurveys = [...this.surveys];
  }
  
  filterSurveys(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSurveys = [...this.surveys];
      return;
    }
    
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredSurveys = this.surveys.filter(survey => 
      survey.title.toLowerCase().includes(term) || 
      survey.description.toLowerCase().includes(term)
    );
  }
  
  selectSurvey(surveyId: string): void {
    this.selectedSurveyId = surveyId;
  }
  
  getSurveyStatus(survey: Survey): string {
    const now = new Date();
    if (now < survey.startDate) {
      return 'Próxima';
    } else if (now > survey.endDate) {
      return 'Completada';
    } else {
      return 'Activa';
    }
  }
  
  getSurveyStatusClass(survey: Survey): string {
    const status = this.getSurveyStatus(survey);
    switch (status) {
      case 'Activa': return 'active';
      case 'Próxima': return 'upcoming';
      case 'Completada': return 'completed';
      default: return '';
    }
  }
  
  onNext(): void {
    if (this.selectedSurveyId) {
      this.router.navigate(['/surveys/notify-respondents', this.selectedSurveyId]);
    } else {
      this.dialogService.error(
        'Debes seleccionar una encuesta para continuar.',
        'Error',
        '/error.png'
      );
    }
  }
  
  onBack(): void {
    this.router.navigate(['/surveys']);
  }
}
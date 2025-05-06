import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../../shared/services/dialog.service';

interface Survey {
  id: string;
  questionIds: string[]; 
}
interface Question {
  id: string;
}


@Component({
  selector: 'app-assign-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent],
  templateUrl: './assign-questions.component.html',
  styleUrls: ['./assign-questions.component.scss']
})
export class AssignQuestionsComponent implements OnInit {
  // Datos para las listas
  surveys: Survey[] = [];
  questions: Question[] = [];
  

  
  // Selecciones
  selectedSurveyId: string | null = null;
  selectedQuestionIds: string[] = [];
  
  // Flag para controlar cambios sin guardar
  hasUnsavedChanges: boolean = false;
  
  constructor(
    private router: Router,
    private dialogService: DialogService
  ) {}
  
  ngOnInit(): void {
    this.loadSurveys();
    this.loadQuestions();
  }
  
  // Métodos para cargar los datos
  loadSurveys(): void {
    // Encuestas simplificadas
    this.surveys = [
      { id: '1', questionIds: ['2', '5'] },
      { id: '2', questionIds: ['1', '3'] },
      { id: '3', questionIds: [] },
      { id: '4', questionIds: ['4'] },
      { id: '5', questionIds: [] }
    ];
  }
  loadQuestions(): void {
    // Preguntas simplificadas
    this.questions = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
      { id: '7' }
    ];
  }
  
  toggleSurveySelection(surveyId: string): void {
    if (this.selectedSurveyId === surveyId) {
      this.selectedSurveyId = null;
      this.selectedQuestionIds = [];
      this.hasUnsavedChanges = false;
    } else {
      this.selectedSurveyId = surveyId;
      this.selectedQuestionIds = [];
      this.hasUnsavedChanges = false;
    }
  }
  
  toggleQuestionSelection(questionId: string): void {
    if (!this.selectedSurveyId) {
      this.dialogService.error(
        'Debes seleccionar una encuesta primero antes de elegir preguntas.',
        'Selecciona una encuesta'
      );
      return;
    }
  
    if (this.isQuestionAlreadyAssigned(questionId)) {
      this.dialogService.error(
        'Esta pregunta ya está asignada a la encuesta seleccionada.',
        'Pregunta ya asignada'
      );
      return;
    }

  
    this.selectedQuestionIds.push(questionId);
    this.hasUnsavedChanges = true;
  }
  
  
  isSelectedSurvey(surveyId: string): boolean {
    return this.selectedSurveyId === surveyId;
  }
  
  isSelectedQuestion(questionId: string): boolean {
    return this.selectedQuestionIds.includes(questionId);
  }
  
  isQuestionAlreadyAssigned(questionId: string): boolean {
    if (!this.selectedSurveyId) return false;
    
    const selectedSurvey = this.surveys.find(s => s.id === this.selectedSurveyId);
    return selectedSurvey ? selectedSurvey.questionIds.includes(questionId) : false;
  }
  
  canSave(): boolean {
    return !!this.selectedSurveyId && this.selectedQuestionIds.length > 0;
  }
  

  
  onSave(): void {
    if (!this.selectedSurveyId || this.selectedQuestionIds.length === 0) {
      this.dialogService.error(
        'Debes seleccionar una encuesta y al menos una pregunta para guardar.',
        'Selección incompleta'
      );
      return;
    }
  
    const surveyIndex = this.surveys.findIndex(s => s.id === this.selectedSurveyId);
    if (surveyIndex === -1) return;
  
    const existingQuestions = this.surveys[surveyIndex].questionIds;
    const newQuestions = this.selectedQuestionIds.filter(q => !existingQuestions.includes(q));
  
    this.surveys[surveyIndex].questionIds.push(...newQuestions);
  
    this.dialogService.success(
      'Las preguntas han sido asignadas correctamente a la encuesta.',
      'Asignación Exitosa',
      '/palomita.png'
    );
  
    this.selectedQuestionIds = [];
    this.hasUnsavedChanges = false;
  }
  
  
  onCancel(): void {
   
          this.router.navigate(['/surveys']);
    
  }
  
  onBack(): void {
   this.router.navigate(['/surveys']);
  }
}
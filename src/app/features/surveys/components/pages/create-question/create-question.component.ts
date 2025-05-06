import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { DialogService } from '../../../../../shared/services/dialog.service';

interface Career {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent],
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  questionForm: FormGroup;
  careers: Career[] = [];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.questionForm = this.createForm();
  }
  
  ngOnInit(): void {
    this.loadCareers();
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(5)]],
      questionType: ['', Validators.required],
      career: ['', Validators.required]
    });
  }
  
  loadCareers(): void {
    // En un caso real, estos datos vendrían de un servicio
    this.careers = [
      { id: '1', name: 'Ingeniería en Sistemas' },
      { id: '2', name: 'Ingeniería Industrial' },
      { id: '3', name: 'Ingeniería Civil' },
      { id: '4', name: 'Medicina' },
      { id: '5', name: 'Psicología' },
      { id: '6', name: 'Administración de Empresas' },
      { id: '7', name: 'Contabilidad' },
      { id: '8', name: 'Derecho' }
    ];
  }
  
  onSave(): void {
    if (this.questionForm.valid) {
      // En un caso real, aquí enviarías los datos al servidor
      console.log('Pregunta guardada:', this.questionForm.value);
      
      this.dialogService.success(
        'La pregunta ha sido creada correctamente.',
        'Pregunta Creada',
        '/palomita.png'
      );
      
      // Navegar de vuelta a la lista de encuestas o preguntas
      setTimeout(() => {
        this.router.navigate(['/surveys']);
      }, 1500);
    } else {
      // Marcar todos los controles como tocados para mostrar errores
      Object.keys(this.questionForm.controls).forEach(key => {
        this.questionForm.get(key)?.markAsTouched();
      });
      
      this.dialogService.error(
        'Por favor completa todos los campos requeridos.',
        'Error de Validación',
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
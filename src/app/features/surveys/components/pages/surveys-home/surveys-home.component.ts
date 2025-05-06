import { Component } from '@angular/core';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveys-home',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './surveys-home.component.html',
  styleUrl: './surveys-home.component.scss'
})
export class SurveysHomeComponent {

  constructor(private router: Router) {

  }
  
  onBack(): void {
    this.router.navigate(['/']);
  }

  onCreateSurvey(): void {
    this.router.navigate(['/surveys/create']);
  }
  onAssignQuestions(): void {
    this.router.navigate(['/surveys/assign-questions']);
  }
}

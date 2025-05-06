import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../medications/components/buttons/back-button/back-button.component';

@Component({
  selector: 'app-notify-respondents',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './notify-respondents.component.html',
  styleUrl: './notify-respondents.component.css'
})
export class NotifyRespondentsComponent {

constructor(private router: Router) { }

  onBack(): void {
    this.router.navigate(['/surveys']);
  }
}

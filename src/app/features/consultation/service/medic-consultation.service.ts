import { Injectable } from '@angular/core';
import { Consultation } from '../models/medic-consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private consultationData: Consultation | null = null;

  setConsultation(data: Consultation): void {
    this.consultationData = data;
  }

  getConsultation(): Consultation | null {
    return this.consultationData;
  }

  clearConsultation(): void {
    this.consultationData = null;
  }
}

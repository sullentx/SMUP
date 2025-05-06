import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicPrescription } from '../models/medic-prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private prescriptionsSubject = new BehaviorSubject<MedicPrescription[]>([]);
  private nextId = 1;

  getPrescriptions(): Observable<MedicPrescription[]> {
    return this.prescriptionsSubject.asObservable();
  }

  addPrescription(prescription: MedicPrescription): void {
    const current = this.prescriptionsSubject.value;
    this.prescriptionsSubject.next([...current, prescription]);
  }

  clearPrescriptions(): void {
    this.prescriptionsSubject.next([]);
  }
}

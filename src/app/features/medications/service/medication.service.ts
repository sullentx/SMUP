import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  // Datos de prueba
  private medications: Medication[] = [
    { id: 1, code: 'MED001', name: 'Paracetamol', description: 'Analgésico y antipirético', stock: 150 },
    { id: 2, code: 'MED002', name: 'Ibuprofeno', description: 'Antiinflamatorio no esteroideo', stock: 120 },
    { id: 3, code: 'MED003', name: 'Amoxicilina', description: 'Antibiótico betalactámico', stock: 80 },
    { id: 4, code: 'MED004', name: 'Omeprazol', description: 'Inhibidor de la bomba de protones', stock: 95 },
    { id: 5, code: 'MED005', name: 'Loratadina', description: 'Antihistamínico', stock: 110 }
  ];

  getMedications(): Observable<Medication[]> {
    return of(this.medications);
  }

  getMedication(id: number): Observable<Medication | undefined> {
    return of(this.medications.find(med => med.id === id));
  }

  addMedication(medication: Medication): Observable<Medication> {
    const newId = Math.max(...this.medications.map(m => m.id || 0)) + 1;
    const newMedication = { ...medication, id: newId };
    this.medications.push(newMedication);
    return of(newMedication);
  }

  updateMedication(medication: Medication): Observable<Medication> {
    const index = this.medications.findIndex(m => m.id === medication.id);
    if (index !== -1) {
      this.medications[index] = medication;
    }
    return of(medication);
  }

  deleteMedication(id: number): Observable<boolean> {
    const initialLength = this.medications.length;
    this.medications = this.medications.filter(m => m.id !== id);
    return of(initialLength > this.medications.length);
  }
}
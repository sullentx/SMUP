import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medication } from '../models/medication.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  private medications: Medication[] = [
    { 
      id: 1, 
      code: '001', 
      name: 'Paracetamol', 
      stock: 150,
      laboratory: 'Bayer',
      dosage: '500mg',
      type: 'Analgésico'
    },
    { 
      id: 2, 
      code: '002', 
      name: 'Ibuprofeno', 
      stock: 120,
      laboratory: 'Pfizer',
      dosage: '400mg',
      type: 'Antiinflamatorio'
    },
    { 
      id: 3, 
      code: '003', 
      name: 'Amoxicilina', 
      stock: 80,
      laboratory: 'Roche',
      dosage: '250mg',
      type: 'Antibiótico'
    },
    { 
      id: 4, 
      code: '004', 
      name: 'Omeprazol', 
      stock: 95,
      laboratory: 'GSK',
      dosage: '20mg',
      type: 'Antiácido'
    },
    { 
      id: 5, 
      code: '005', 
      name: 'Loratadina', 
      stock: 110,
      laboratory: 'Sanofi',
      dosage: '10mg',
      type: 'Antihistamínico'
    },
    { 
      id: 5, 
      code: '005', 
      name: 'Loratadina', 
      stock: 110,
      laboratory: 'Sanofi',
      dosage: '10mg',
      type: 'Antihistamínico'
    },
    { 
      id: 5, 
      code: '005', 
      name: 'Loratadina', 
      stock: 110,
      laboratory: 'Sanofi',
      dosage: '10mg',
      type: 'Antihistamínico'
    },{ 
      id: 5, 
      code: '005', 
      name: 'Loratadina', 
      stock: 110,
      laboratory: 'Sanofi',
      dosage: '10mg',
      type: 'Antihistamínico'
    }
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
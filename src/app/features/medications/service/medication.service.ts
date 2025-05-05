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
  addMedication(medication: Medication): Observable<{ success: boolean, medication?: Medication }> {
    // Genera el code automáticamente
    const code = 'MED-' + (Math.floor(Math.random() * 90000) + 10000); // Ejemplo simple
    const isValid = medication.name && medication.laboratory && medication.dosage && medication.type && medication.stock !== undefined;
    if (!isValid) {
      return of({ success: false });
    }
    const newId = Math.max(...this.medications.map(m => m.id || 0)) + 1;
    const newMedication = { ...medication, id: newId, code };
    this.medications.push(newMedication);
    return of({ success: true, medication: newMedication });
  }
  
  updateMedication(medication: Medication): Observable<{ success: boolean, medication?: Medication }> {
    const index = this.medications.findIndex(m => m.id === medication.id);
    // Busca el code original
    const original = this.medications[index];
    const isValid = medication.name && original?.code && medication.laboratory && medication.dosage && medication.type && medication.stock !== undefined;
    if (index !== -1 && isValid) {
      // Mantén el code original
      this.medications[index] = { ...medication, code: original.code };
      return of({ success: true, medication: this.medications[index] });
    }
    return of({ success: false });
  }
  
  deleteMedication(id: number): Observable<{ success: boolean }> {
    const initialLength = this.medications.length;
    this.medications = this.medications.filter(m => m.id !== id);
    return of({ success: initialLength > this.medications.length });
  }
}
import { Injectable } from '@angular/core';
import { MedicIntervention } from '../models/medic-intervention.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicInterventionService {
  private interventions: MedicIntervention[] = [];
  private interventionsSubject = new BehaviorSubject<MedicIntervention[]>(this.interventions);

  constructor() {}

  getAllInterventions() {
    return this.interventionsSubject.asObservable();
  }

  addIntervention(intervention: MedicIntervention) {
    this.interventions.push(intervention);
    this.interventionsSubject.next(this.interventions);
  }
}

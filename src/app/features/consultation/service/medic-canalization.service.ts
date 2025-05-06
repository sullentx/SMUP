import { Injectable } from '@angular/core';
import { Canalization } from '../models/medic-canalization.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanalizationService {
  private canalizations: Canalization[] = [];

  constructor() {}

  saveCanalization(data: Canalization): Observable<boolean> {
    this.canalizations.push(data);
    console.log('Canalización guardada:', data);
    return of(true);
  }

  getAllCanalizations(): Observable<Canalization[]> {
    return of(this.canalizations);
  }
}

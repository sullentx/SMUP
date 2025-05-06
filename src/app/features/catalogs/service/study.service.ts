import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Study } from '../models/study.model';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private studiesSubject = new BehaviorSubject<Study[]>([
    { id: 5, title: 'Estudio 1', description: 'Descripción del estudio' },
    { id: 6, title: 'Estudio 2', description: 'Descripción del estudio' },
    { id: 7, title: 'Estudio 3', description: 'Descripción del estudio' },
    { id: 8, title: 'Estudio 4', description: 'Descripción del estudio' },
    { id: 9, title: 'Estudio 5', description: 'Descripción del estudio' },
    { id: 10, title: 'Estudio 6', description: 'Descripción del estudio' }
  ]);

  private nextId = 11;

  getStudies(): Observable<Study[]> {
    return this.studiesSubject.asObservable();
  }

  addStudy(study: Omit<Study, 'id'>): void {
    const current = this.studiesSubject.value;
    const newStudy: Study = { ...study, id: this.nextId++ };
    this.studiesSubject.next([...current, newStudy]);
  }

  updateStudy(updatedStudy: Study): void {
    const current = this.studiesSubject.value.map(study =>
      study.id === updatedStudy.id ? updatedStudy : study
    );
    this.studiesSubject.next(current);
  }

  deleteStudy(id: number): void {
    const current = this.studiesSubject.value.filter(study => study.id !== id);
    this.studiesSubject.next(current);
  }
}

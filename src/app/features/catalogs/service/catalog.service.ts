import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CatalogItem } from '../models/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private catalogSubject = new BehaviorSubject<CatalogItem[]>([
    { id: 1, title: 'Catálogo Sexo', description: 'Tipos de Sexo' },
    { id: 2, title: 'Catálogo Sangre', description: 'Tipos de Sangre' },
    { id: 3, title: 'Catálogo Estados', description: 'Tipos de Estados' },
    { id: 4, title: 'Catálogo Estado Civil', description: 'Tipos de Estado Civil' },
    { id: 5, title: 'Catálogo Parentesco', description: 'Tipos de Parentescos' },
    { id: 6, title: 'Catálogo Estudios', description: 'Tipos de Estudios Médicos' },
    { id: 7, title: 'Catálogo Intervención', description: 'Tipos de Intervenciones Médicas' },
    { id: 8, title: 'Catálogo Antecedentes', description: 'Tipos de Antecedentes' },
    { id: 9, title: 'Catálogo Extra', description: 'Otro tipo de catálogo' }
  ]);

  private nextId = 10;

  getCatalogItems(): Observable<CatalogItem[]> {
    return this.catalogSubject.asObservable();
  }

  addItem(item: Omit<CatalogItem, 'id'>): void {
    const current = this.catalogSubject.value;
    const newItem: CatalogItem = { id: this.nextId++, ...item };
    this.catalogSubject.next([...current, newItem]);
  }
}

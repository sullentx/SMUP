import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicOrderRegister } from '../models/medic-order-register.model';

@Injectable({
  providedIn: 'root'
})
export class MedicOrderRegisterService {
  private medicOrdersSubject = new BehaviorSubject<MedicOrderRegister[]>([]);
  private nextId = 1; 

  getOrders(): Observable<MedicOrderRegister[]> {
    return this.medicOrdersSubject.asObservable();
  }

  addOrder(order: MedicOrderRegister): void {
    const current = this.medicOrdersSubject.value;
    this.medicOrdersSubject.next([...current, order]);
  }
}

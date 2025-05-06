import { Injectable } from '@angular/core';
import { MedicOrder } from '../models/medic-order.model';

@Injectable({
  providedIn: 'root',
})
export class MedicOrderService {
  private orders: MedicOrder[] = [];

  constructor() {}

  addOrder(order: MedicOrder): void {
    this.orders.push(order);
    console.log('Orden médica agregada:', order);
  }

  getOrders(): MedicOrder[] {
    return this.orders;
  }
}

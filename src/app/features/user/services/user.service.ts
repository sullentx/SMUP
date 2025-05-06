import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Llamar Api
  private currentUser: User = {
    id: '1',
    nombre: 'Eduardo Uriel',
    apellidos: 'Chavez Diaz',
    email: 'eduardochavez019@gmail.com',
    fechaNacimiento: new Date('2005-04-14'),
    profesion: 'Ingeniero en Software'
  };

  constructor() { }

  getCurrentUser(): Observable<User> {
    return of(this.currentUser);
  }

  updateUserProfile(userData: Partial<User>): Observable<User> {
    this.currentUser = { ...this.currentUser, ...userData };
    return of(this.currentUser);
  }
}
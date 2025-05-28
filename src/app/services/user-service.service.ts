import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  updateUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  clearUserData() {
    localStorage.removeItem('user');
    this.userDataSubject.next(null);
  }

  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}

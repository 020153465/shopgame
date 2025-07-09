import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private adminUrl = `${environment.apiUrl}/admin/users`;
  private selfUrl = `${environment.apiUrl}/users/me`;

  constructor(private http: HttpClient) {}

  // Admin endpoints
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.adminUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.adminUrl}/${id}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.adminUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminUrl}/${id}`);
  }

  // Self-service endpoints
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.selfUrl);
  }

  updateCurrentUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(this.selfUrl, user);
  }

  deleteCurrentUser(): Observable<void> {
    return this.http.delete<void>(this.selfUrl);
  }
} 
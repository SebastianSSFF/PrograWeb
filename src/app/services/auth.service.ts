import { Injectable, Inject, PLATFORM_ID } from '@angular/core';import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
        this.currentUserSubject.next(response.user);
      })
    );
  }

  

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  requestPasswordReset(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/request-password-reset`, { email });
}

updateCurrentUser(userData: any): void {
    // Actualizar el usuario en el estado local
    const updatedUser = {...this.currentUserSubject.value, ...userData};
    this.currentUserSubject.next(updatedUser);
    
    // Opcional: Guardar en localStorage si lo estás usando
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
}
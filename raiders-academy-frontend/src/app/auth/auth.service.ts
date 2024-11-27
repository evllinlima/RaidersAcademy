import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://raiders-academy-backend.vercel.app/api/v1';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/curso`);
  }

  getDisciplinas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disciplina`);
  }

  getPerguntasByDisciplina(disciplinaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/perguntas/${disciplinaId}`);
  }

  getRespostasByPergunta(perguntaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/perguntas/${perguntaId}/respostas`);
  }
}

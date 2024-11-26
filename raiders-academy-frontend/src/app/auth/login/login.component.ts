import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Certifique-se de que o FormsModule está importado

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Importa o FormsModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post('https://raiders-academy-backend.vercel.app/api/v1/login', this.loginData)
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            alert('Login realizado com sucesso!');
            this.router.navigate(['/dashboard']); // Navegar para uma página segura
          } else {
            alert('Erro: Token não encontrado.');
          }
        },
        error: (err) => {
          alert('Erro no login: ' + (err.error?.message || err.message));
        },
      });
  }
}

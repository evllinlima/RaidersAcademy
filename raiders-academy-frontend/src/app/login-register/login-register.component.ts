import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})

export class LoginRegisterComponent implements OnInit {
  _isLoginMode = true; // Define o modo atual (login ou registro)
  loginData = { email: '', senha: '' };
  
  // Definindo os tipos para a variável user
  user = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    tipo: '',
    curso: '',
    cursosProfessores: [] as string[], // Especificando que cursosProfessores será um array de strings
  };

  cursos: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Carrega os cursos do banco
    this.loadCursos();
  }

  // Carrega os cursos para o registro
  private loadCursos(): void {
    this.authService.getCursos().subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar cursos:', err);
      },
    });
  }

  // Alterna entre Login e Registro
  toggleMode(): void {
    this._isLoginMode = !this._isLoginMode;
  }

  // Lógica de Login
  login(): void {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          alert('Login realizado com sucesso!');
          this.router.navigate(['/cursos']);
        } else {
          alert('Erro: Token não encontrado.');
        }
      },
      error: (err) => {
        alert('Erro no login: ' + (err.error?.message || err.message));
      },
    });
  }

  // Lógica de Registro
  register(): void {
    // Prepara os dados do usuário com o perfil e cursos selecionados
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('Usuário registrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Erro ao registrar usuário: ' + error.error.message);
      },
    });
  }

  // Função para adicionar ou remover cursos no perfil professor
  onCursoChange(cursoId: string, event: any): void {
    if (event.target.checked) {
      // Adiciona o curso se o checkbox for marcado
      this.user.cursosProfessores.push(cursoId);
    } else {
      // Remove o curso se o checkbox for desmarcado
      this.user.cursosProfessores = this.user.cursosProfessores.filter((id) => id !== cursoId);
    }
  }
}

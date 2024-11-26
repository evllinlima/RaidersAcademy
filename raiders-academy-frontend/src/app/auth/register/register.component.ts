import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = { nome: '', email: '', senha: '', cpf: '', tipo: '', curso: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
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
}

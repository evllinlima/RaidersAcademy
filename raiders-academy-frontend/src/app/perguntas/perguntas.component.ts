import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./perguntas.component.css']
})
export class PerguntasComponent implements OnInit {
  perguntas: any[] = [];
  disciplinaId!: string;
  isLoading = true;
  
  // Novos campos para criar pergunta
  mostrarFormCriarPergunta = false;
  tituloPergunta = '';
  descricaoPergunta = '';
  errorMessage = '';
  isEnviando = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.disciplinaId = this.route.snapshot.paramMap.get('disciplinaId')!;
    this.getPerguntas();
  }

  getPerguntas(): void {
    this.authService.getPerguntasByDisciplina(this.disciplinaId).subscribe((data) => {
      this.perguntas = data;
      this.isLoading = false;
    });
  }
  
  navegarParaRespostas(perguntaId: string): void {
    this.router.navigate(['/perguntas', perguntaId, 'respostas']);
  }

  // Método para mostrar/esconder formulário de criar pergunta
  toggleFormCriarPergunta(): void {
    this.mostrarFormCriarPergunta = !this.mostrarFormCriarPergunta;
    // Limpa os campos quando fecha o formulário
    if (!this.mostrarFormCriarPergunta) {
      this.limparCampos();
    }
  }

  // Método para criar pergunta
  criarPergunta(): void {
    // Validação básica
    if (!this.tituloPergunta.trim() || !this.descricaoPergunta.trim()) {
      this.errorMessage = 'Título e descrição são obrigatórios';
      return;
    }

    this.isEnviando = true;
    this.errorMessage = '';

    const endpoint = 'https://raiders-academy-backend.vercel.app/api/v1/perguntas';

    const payload = {
      titulo: this.tituloPergunta,
      descricao: this.descricaoPergunta,
      disciplina: this.disciplinaId
    };

    // Recupera o token do localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado!');
      this.isEnviando = false;
      this.errorMessage = 'Você precisa estar logado para criar uma pergunta';
      return;
    }

    // Configura os headers com o token de autorização
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Faz a requisição POST com os headers
    this.http.post(endpoint, payload, { headers }).subscribe(
      (resposta: any) => {
        // Adiciona a nova pergunta à lista
        this.perguntas.unshift(resposta);
        this.limparCampos();
        this.mostrarFormCriarPergunta = false;
        this.isEnviando = false;
      },
      error => {
        console.error('Erro ao criar pergunta:', error);
        this.isEnviando = false;
        this.errorMessage = 'Erro ao criar pergunta. Tente novamente.';
      }
    );
  }

  // Método para limpar campos do formulário
  limparCampos(): void {
    this.tituloPergunta = '';
    this.descricaoPergunta = '';
    this.errorMessage = '';
  }
}
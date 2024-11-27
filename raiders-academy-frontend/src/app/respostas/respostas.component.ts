import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./respostas.component.css']
})
export class RespostasComponent implements OnInit {
  perguntaId!: string;
  respostas: any[] = [];
  isLoading = true;
  novaResposta = '';
  isEnviando = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.perguntaId = params.get('perguntaId')!;
      this.buscarRespostas();
    });
  }

  buscarRespostas(): void {
    this.authService.getRespostasByPergunta(this.perguntaId).subscribe(
      (respostas: any[]) => {
        this.respostas = respostas;
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao buscar respostas:', error);
        this.isLoading = false;
      }
    );
  }
  enviarResposta(): void {
    if (!this.novaResposta.trim()) return;
  
    this.isEnviando = true;
    const endpoint = 'https://raiders-academy-backend.vercel.app/api/v1/respostas';
  
    const payload = {
      descricao: this.novaResposta,
      pergunta: this.perguntaId,
    };
  
    // Recupera o token do localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado!');
      this.isEnviando = false;
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
        // Adiciona a nova resposta à lista
        this.respostas.push(resposta);
        this.novaResposta = '';
        this.isEnviando = false;
        this.buscarRespostas();
      },
      error => {
        console.error('Erro ao enviar resposta:', error);
        this.isEnviando = false;
        // Opcional: Mostrar mensagem de erro para o usuário
      }
    );
  }
}
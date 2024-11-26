// perguntas.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./perguntas.component.css']
})
export class PerguntasComponent implements OnInit {
  perguntas: any[] = [];
  disciplinaId!: string;  // Agora a propriedade está inicializada com non-null assertion.

  constructor(
    private route: ActivatedRoute,  // Pega os parâmetros da rota
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtém o 'disciplinaId' da rota
    this.disciplinaId = this.route.snapshot.paramMap.get('disciplinaId')!;
    this.getPerguntas();
  }

  getPerguntas(): void {
    // Chama o método do AuthService para obter as perguntas da disciplina
    this.authService.getPerguntasByDisciplina(this.disciplinaId).subscribe((data) => {
      this.perguntas = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importando Router
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  disciplinas: any[] = [];
  syllabusVisibility: { [key: string]: boolean } = {};
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getCursos();
    this.getDisciplinas();
  }

  getCursos(): void {
    this.authService.getCursos().subscribe((data) => {
      this.cursos = data;
      this.isLoading = false;
    });
  }

  getDisciplinas(): void {
    this.authService.getDisciplinas().subscribe((data) => {
      this.disciplinas = data;
      this.isLoading = false;
    });
  }

  navegarParaPerguntas(disciplinaId: string): void {
    this.router.navigate(['/perguntas', disciplinaId]);
  }

  toggleSyllabus(disciplinaId: string): void {
    // Alterna a visibilidade do syllabus da disciplina clicada
    this.syllabusVisibility[disciplinaId] = !this.syllabusVisibility[disciplinaId];
  }

  isSyllabusVisible(disciplinaId: string): boolean {
    // Verifica se o syllabus da disciplina está visível
    return this.syllabusVisibility[disciplinaId];
  }
}

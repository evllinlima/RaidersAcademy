import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { PerguntasComponent } from './perguntas/perguntas.component';
import { RespostasComponent } from './respostas/respostas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'perguntas/:disciplinaId', component: PerguntasComponent },
  { path: 'perguntas/:perguntaId/respostas', component: RespostasComponent }
];

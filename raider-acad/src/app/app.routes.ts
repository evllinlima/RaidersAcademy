import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastrarComponent } from './components/cadastrar/cadastrar.component';
import { LoginComponent } from './components/login/login.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { RespostaComponent } from './components/resposta/resposta.component';
import { autorizacaoGuard } from './_guard/autorizacao.guard';
import { PerguntasComponent } from './components/perguntas/perguntas.component';


export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'cadastrar', component: CadastrarComponent},
    {path: 'login', component: LoginComponent},
    {path: 'disciplinas', component: DisciplinasComponent , canActivate: [autorizacaoGuard]},
    {path: 'resposta', component: RespostaComponent , canActivate: [autorizacaoGuard]},
    {path: 'perguntas', component: PerguntasComponent},
    {path: '**', redirectTo: 'home'},


];

import { AutorizacaoService } from '../../_service/autorizacao.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrigido 'styleUrl' para 'styleUrls'
})

export class LoginComponent implements OnInit {

  constructor(private autorizacaoService: AutorizacaoService) { }

  descricaoLogin = () =>
    this.autorizacaoService.statusLogin() ? "Login Realizado" : "Login";

  ngOnInit(): void {
    // Adicionando o comportamento dos botões e container
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement;
    const signInButton = document.getElementById('signIn') as HTMLButtonElement;
    const container = document.getElementById('container') as HTMLDivElement;

    signUpButton?.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  clickLogin() {
    if (this.autorizacaoService.statusLogin()) {
      this.autorizacaoService.deslogar();
    } else {
      this.autorizacaoService.autorizar();
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-resposta',
  standalone: true,
  imports: [],
  templateUrl: './resposta.component.html',
  styleUrl: './resposta.component.css'
})
export class RespostaComponent {
  showTextArea: boolean = false;
 toggleNewRQuestionForm(){
    this.showTextArea = !this.showTextArea;
  }
}

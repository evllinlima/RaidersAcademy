import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-perguntas',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './perguntas.component.html',
  styleUrl: './perguntas.component.css'
})
export class PerguntasComponent {
  showTextArea: boolean = false;
  toggleNewResponseForm(){
    this.showTextArea = !this.showTextArea;
  }
}

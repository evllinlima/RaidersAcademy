import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('menuIcon', { static: true }) menuIcon!: ElementRef;
  @ViewChild('closeIcon', { static: true }) closeIcon!: ElementRef;
  @ViewChild('navbar', { static: true }) navbar!: ElementRef;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    // Este método pode ser mantido para lógica de inicialização, mas a manipulação de eventos
    // ocorre no ngAfterViewInit após os elementos estarem acessíveis via ViewChild.
  }

  ngAfterViewInit() {
    // Adiciona os ouvintes de evento após a inicialização da view
    this.renderer.listen(this.menuIcon.nativeElement, 'click', () => this.toggleMenu(true));
    this.renderer.listen(this.closeIcon.nativeElement, 'click', () => this.toggleMenu(false));
  }

  @ViewChild('overlay') overlay!: ElementRef;

toggleMenu(open: boolean) {
  const navbar = this.navbar.nativeElement;
  const menuIcon = this.menuIcon.nativeElement;
  const closeIcon = this.closeIcon.nativeElement;
  const overlay = this.overlay.nativeElement;
  
  if (open) {
    this.renderer.addClass(navbar, 'active');
    this.renderer.addClass(menuIcon, 'active');
    this.renderer.addClass(closeIcon, 'active');
    this.renderer.addClass(overlay, 'active');
  } else {
    this.renderer.removeClass(navbar, 'active');
    this.renderer.removeClass(menuIcon, 'active');
    this.renderer.removeClass(closeIcon, 'active');
    this.renderer.removeClass(overlay, 'active');
  }
}

  navigateToLogin() {
    this.router.navigate(['/login-register']);  // Navega para a rota /login-register
  }
}

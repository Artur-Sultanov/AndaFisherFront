import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from './components/layout/footer/footer.component';
import { HeaderLayoutComponent } from './components/layout/header/header.component';
import { NavLayoutComponent } from './components/layout/header/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    FooterLayoutComponent,
    HeaderLayoutComponent,
    NavLayoutComponent,
  ],
})
export class AppComponent {
  title = 'anda-fisher-f';
}

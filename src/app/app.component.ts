import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Для router-outlet
import { HeaderLayoutComponent } from './shared/components/header/header.component'; // Для app-header
import { FooterLayoutComponent } from './shared/components/footer/footer.component'; // Для app-footer
import { NavLayoutComponent } from './shared/components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

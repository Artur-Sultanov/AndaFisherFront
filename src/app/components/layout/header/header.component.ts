import { Component } from '@angular/core';
import { NavLayoutComponent } from './nav/nav.component';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [NavLayoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderLayoutComponent {
  title: string = 'APP ANDA PESCAR';
}

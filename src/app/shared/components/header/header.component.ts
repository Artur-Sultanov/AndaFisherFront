import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderLayoutComponent {
  title: string = 'APP ANDA PESCAR';
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavigationOption {
  [x: string]: any;
  link: string;
  title: string;
}

@Component({
  selector: 'app-layout-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavLayoutComponent {
  options: NavigationOption[] = [
    { link: '/beach-list', title: 'beach-list' },
    // { link: '/beach-detail', title: 'beach-detail' },
    { link: '/fish-list', title: 'fish-list' },
    // { link: '/fish-detail', title: 'fish-detail' },
  ];
}

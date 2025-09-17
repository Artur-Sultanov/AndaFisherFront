import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderLayoutComponent {
  menuOpen = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  login() {
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.menuOpen = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

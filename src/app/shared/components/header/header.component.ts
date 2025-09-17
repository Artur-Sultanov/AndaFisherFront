import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    this.authService.authState$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.isAuthenticated = !!user || this.authService.isAuthenticated();
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  login(): void {
    this.closeMenu();
    this.router.navigate(['/auth/login']);
  }

  register(): void {
    this.closeMenu();
    this.router.navigate(['/auth/register']);
  }

  goToProfile(): void {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.closeMenu();
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']),
    });
  }

  private closeMenu(): void {
    this.menuOpen = false;
  }
}

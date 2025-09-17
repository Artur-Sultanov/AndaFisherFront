import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private readonly token = this.route.snapshot.paramMap.get('token') ?? '';

  resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  errorMessage = '';
  isSubmitting = false;
  resetComplete = false;

  onSubmit(): void {
    if (this.resetForm.invalid || this.isSubmitting) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const { password, confirmPassword } = this.resetForm.value;
    if (password !== confirmPassword) {
      this.errorMessage = '⚠️ Passwords do not match.';
      return;
    }

    if (!this.token) {
      this.errorMessage = '❌ The reset link is invalid or has expired.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService
      .resetPassword({ token: this.token, password })
      .subscribe({
        next: () => {
          this.resetComplete = true;
          this.isSubmitting = false;
        },
        error: (err) => {
          this.errorMessage =
            err?.error || '❌ Unable to reset password. Please try again.';
          this.isSubmitting = false;
        },
      });
  }

  returnToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}

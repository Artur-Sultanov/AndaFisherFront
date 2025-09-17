import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  fieldErrors: Record<string, string[]> = {};
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('\\+?[0-9]{9,15}')],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordGroupValidator.bind(this) }
    );
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    if (this.registerForm.invalid) {
      this.errorMessage = '⚠️ Please fill in all required fields correctly!';
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.fieldErrors = {};

    const { confirmPassword: _confirmPassword, ...payload } = this.registerForm.value;

    this.authService
      .register(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
      next: () => {
        alert('✅ Registration successful! You can now log in.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.handleRegistrationError(err?.error);
      },
    });
  }

  private passwordGroupValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value as string;
    const confirmPassword = confirmPasswordControl.value as string;

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    const passwordHasValue = !!password;
    const passwordComplexityInvalid = passwordHasValue && !passwordPattern.test(password);
    const passwordsMismatch =
      passwordHasValue && !!confirmPassword && password !== confirmPassword;

    this.setControlError(passwordControl, 'passwordComplexity', passwordComplexityInvalid);
    this.setControlError(confirmPasswordControl, 'passwordMismatch', passwordsMismatch);

    const errors: ValidationErrors = {};

    if (passwordComplexityInvalid) {
      errors['passwordComplexity'] = true;
    }

    if (passwordsMismatch) {
      errors['passwordMismatch'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  private setControlError(
    control: AbstractControl | null,
    errorKey: string,
    shouldSet: boolean
  ): void {
    if (!control) {
      return;
    }

    const currentErrors = control.errors ?? {};

    if (shouldSet) {
      if (!currentErrors[errorKey]) {
        control.setErrors({ ...currentErrors, [errorKey]: true });
      }
      return;
    }

    if (currentErrors[errorKey]) {
      const { [errorKey]: _removed, ...remaining } = currentErrors;
      control.setErrors(Object.keys(remaining).length ? remaining : null);
    }
  }

  private handleRegistrationError(error: unknown): void {
    this.errorMessage = '❌ Registration failed. Please try again.';

    if (typeof error === 'string') {
      this.errorMessage = error;
      return;
    }

    if (error && typeof error === 'object') {
      const errorObject = error as Record<string, unknown>;

      const message = errorObject['message'] ?? errorObject['error'];
      if (typeof message === 'string' && message.trim().length > 0) {
        this.errorMessage = message;
      }

      const errors = errorObject['errors'];
      if (errors && typeof errors === 'object') {
        const normalizedErrors: Record<string, string[]> = {};
        for (const [key, value] of Object.entries(errors as Record<string, unknown>)) {
          if (value === undefined || value === null) {
            continue;
          }

          normalizedErrors[key] = Array.isArray(value)
            ? (value as unknown[]).map((item) => String(item))
            : [String(value)];
        }

        if (Object.keys(normalizedErrors).length) {
          this.fieldErrors = normalizedErrors;
          if (!message) {
            this.errorMessage = '';
          }
        }
      }
    }
  }
}

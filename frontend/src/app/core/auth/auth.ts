import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {
  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  errorMessage: string | null = null;

  authService = inject(AuthService);

  router = inject(Router);

  async onLogin() {
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        this.errorMessage = 'Email and password are required.';
        return;
      }
      console.log({ email, password })
      await this.authService.login(email, password);
      await this.router.navigate(['/patients'])
    } catch (err) {
      this.errorMessage = 'Login failed';
      console.error('Login failed:', err);
    }
  }
}

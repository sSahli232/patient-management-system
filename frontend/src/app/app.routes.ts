import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { isUserAuthenticated } from './core/auth/guards/auth.guard';
import { Patients } from './features/patients/patients';
import { inject } from '@angular/core';
import { AuthService } from './core/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => inject(AuthService).isLoggedIn() ? 'patients' : 'login',
    pathMatch: 'full',
  },
  {
    path: "login",
    component: Auth, // TODO: redirect to patient page when the user is already logged in.
  },
  {
    path: "patients",
    component: Patients,
    canActivate: [isUserAuthenticated],
  },
];

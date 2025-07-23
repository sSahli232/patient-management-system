import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { Patient } from './features/patient/patient';
import { isUserAuthenticated } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    component: Auth, // TODO: redirect to patient page when the user is already logged in.
  },
  {
    path: "patients",
    component: Patient,
    canActivate: [isUserAuthenticated],
  },
];

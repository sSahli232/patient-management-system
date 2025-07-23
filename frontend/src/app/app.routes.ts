import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { isUserAuthenticated } from './core/auth/guards/auth.guard';
import { Patients } from './features/patients/patients';

export const routes: Routes = [
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

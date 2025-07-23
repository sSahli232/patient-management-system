import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { Patient } from './features/patient/patient';
import { isUserAuthenticated } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    component: Auth,
  },
  {
    path: "patients",
    component: Patient,
    canActivate: [isUserAuthenticated],
  },
];

import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';
import { isUserAuthenticated } from './core/auth/guards/auth.guard';
import { Patients } from './features/patients/patients';

export const routes: Routes = [
  {
    path: "login",
    component: Auth,
  },
  {
    path: "patients",
    component: Patients,
    canActivate: [isUserAuthenticated],
  },
];

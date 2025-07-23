import { Routes } from '@angular/router';
import { Auth } from './core/auth/auth';

export const routes: Routes = [
  {
    path: "login",
    component: Auth,
  },
];

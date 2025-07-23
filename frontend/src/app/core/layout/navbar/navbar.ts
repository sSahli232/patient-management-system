import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  router = inject(Router);

  authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn;

  async onLogout() {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }

  async onLogin() {
    await this.router.navigate(['/login']);
  }
}

import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment.development";
import { User } from "../models/user.model";
import { JwtService } from "./jwt.service";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);

  router = inject(Router);

  tokenService = inject(JwtService);

  constructor() {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user()
      if (user) {
        this.tokenService.saveToken(user.accessToken);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${environment.apiUrl}/auth/login`, {
      email,
      password
    });
    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);
    return user;
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    // const json = this.tokenService.getToken()
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.tokenService.destroyToken();
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login')
  }

  isAdmin() {
    const user = this.user();
    return user?.roles.includes('admin');
  }
}

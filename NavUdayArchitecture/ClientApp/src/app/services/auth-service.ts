import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  applicationUrl = environment.applicationUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<AuthenticateResponse>(
      this.applicationUrl + '/users/authenticate',
      loginModel
    );
  }

  isUserLoggedIn() {
    let token = localStorage.getItem('access_token');
    return token != null && token != '';
  }

  registerUser(registerModel: RegisterUser) {
    return this.httpClient.post<any>(
      this.applicationUrl + '/users/registerUser',
      registerModel
    );
  }

  logout() {
    localStorage.setItem('access_token', '');
    this.router.navigateByUrl('login');
  }
}

export interface LoginModel {
  username: string;
  password: string;
}

export interface AuthenticateResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

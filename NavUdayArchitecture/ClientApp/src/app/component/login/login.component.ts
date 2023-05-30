import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginModel } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  errorMessage = '';
  ngOnInit(): void {
    
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('user-dashboard');
    }

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const loginModel: LoginModel = {
        username: this.form.value.username,
        password: this.form.value.password,
      };
      this.authService.login(loginModel).subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.router.navigateByUrl('user-dashboard');
        },
        error: (ex) => {
          this.errorMessage = 'User name & password is not correct';
        },
      });
    }
  }
}

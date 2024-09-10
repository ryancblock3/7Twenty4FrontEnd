import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  loginAsEvaluator() {
    this.userService.loginAsEvaluator(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.login(response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 400) {
          console.error('Invalid credentials');
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    );
  }  
}
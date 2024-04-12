import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
interface LoginResponse {
  token: string;
  // other properties if applicable
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/activities'])
    }
  }
  data = {
    email: "",
    password: ""
  }
  errorMessage: string
  token: string
  constructor(private authService: AuthService, private router: Router,) {
    this.token = ""
    this.errorMessage = ""
  }
  Login() {
    this.authService.login(this.data).subscribe(
      (response: any) => {
        localStorage.setItem("token", (response as LoginResponse).token)
        this.router.navigate(['/activities'])
      },
      error => {
        this.errorMessage = "Login ou mot de pass incorrect" // Error handling
      }
    );
  }
}
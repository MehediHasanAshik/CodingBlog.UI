import { Component } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.authService.Login(this.model).subscribe({
      next: (res) => {
        //set Auth Cookies
        this.cookieService.set('Authorization', `Bearer ${res.token}`, undefined, '/', undefined, true, 'Strict');

        //set the user
        this.authService.setUser({
          email: res.email,
          roles: res.roles
        })

        //redirect back to home service
        this.router.navigateByUrl('/home')
      }
    })
  }

}

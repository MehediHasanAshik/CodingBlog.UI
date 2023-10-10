import { Component } from '@angular/core';
import { RegisterRequest } from '../Models/register-request.model';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: RegisterRequest;
  isPassMatched: boolean = false;
  isRegisterSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.model = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  onFormSubmit(): void {
    if (this.model.email !== null && this.model.password !== null && this.model.confirmPassword !== null) {
      if (this.model.password !== this.model.confirmPassword) {
        this.isPassMatched = true;
        setTimeout(() => {
          this.isPassMatched = false;
        }, 1500);
        return;
      }
      this.authService.register(this.model).subscribe({
        next: (res) => {
          this.isRegisterSuccess = true;
          setTimeout(() => {
            this.isRegisterSuccess = false;
            this.router.navigateByUrl('/login');
          }, 1500);
        },
        error: err => {
          if (err.error && err.error.errors && err.error.errors[''].length > 0) {
            this.errorMessage = err.error.errors[''][0];
          } else {
            this.errorMessage = "An Error Occurred"
          }
        }
      })
    }
  }

}

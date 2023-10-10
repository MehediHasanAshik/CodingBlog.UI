import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Features/Auth/Models/user,model';
import { AuthService } from 'src/app/Features/Auth/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user?: User;

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res) => {
        this.user = res;
      }
    });

    this.user = this.authService.getUser();
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

}

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage!: string;
  AuthUserSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      },
    });
  }

  onSubmitLogin(formLogin: NgForm) {
    if (!formLogin.valid) {
      return;
    }
    const email = formLogin.value.email;
    const password = formLogin.value.password;

    this.authService.login(email, password).subscribe({
      next: (userData) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      },
    });
  }

  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }
}

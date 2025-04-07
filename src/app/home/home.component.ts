import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  pubContent: string = '';
  user!: User;
  AuthUserSub!: Subscription;
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });

    this.userService.getUserPublicContent().subscribe({
      next: (data) => {
        this.pubContent = data;
      },
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }
}

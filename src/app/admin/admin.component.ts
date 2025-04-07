import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  adminPubContent!: string;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getAdminPublicContent().subscribe({
      next: (data) => {
        this.adminPubContent = data;
      },
      error: (err) => console.log(err),
    });
  }
}

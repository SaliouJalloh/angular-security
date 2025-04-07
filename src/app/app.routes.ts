import { Routes } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'forbidden',
    component: AccessDeniedComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

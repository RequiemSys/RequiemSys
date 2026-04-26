import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { LoginDois } from './pages/login-dois/login-dois';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  // A "Base" de dashboard seria algo como:
  // { path: 'dashboard', component: DashboardBaseComponent }
];

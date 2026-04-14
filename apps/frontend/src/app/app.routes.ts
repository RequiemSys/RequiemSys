import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { LoginDois } from './pages/login-dois/login-dois';

export const routes: Routes = [
    {path: '', component: Login}, // rota padrão
    {path: 'login', component: Login}, // rota do login
    {path: 'registro', component: Registro }, // rota do registro
    {path: 'login-dois', component: LoginDois }, // rota do registro
];

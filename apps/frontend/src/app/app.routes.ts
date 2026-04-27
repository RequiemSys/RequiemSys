import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { LoginDois } from './pages/login-dois/login-dois';
import { BaseLayout } from './pages/base-layout/base-layout';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'login-dois', component: LoginDois },
    {path: 'base',
    component: BaseLayout,
    children:[  
        {path: 'registro', component: Registro },
    ]}

];

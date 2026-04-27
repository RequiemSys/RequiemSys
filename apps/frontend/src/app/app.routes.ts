import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { BaseLayout } from './pages/base-layout/base-layout';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'base',
    component: BaseLayout,
    children:[  
        {path: 'registro', component: Registro },
    ]}

];

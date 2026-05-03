import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { BaseLayout } from './pages/base-layout/base-layout';
import { UsersOptions } from './pages/users/users-options/users-options';
import { Working } from './pages/working/working';

export const routes: Routes = [
    {path: '', component: Login},
    {path: 'base',
    component: BaseLayout,
    children:[  
        {path: 'employee-management', component: UsersOptions },
        {path: 'registro', component: Registro },
        {path: 'working', component: Working},
    ]}

];

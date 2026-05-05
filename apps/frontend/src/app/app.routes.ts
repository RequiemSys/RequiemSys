import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { BaseLayout } from './pages/base-layout/base-layout';
import { UserControlPanelComponent } from './pages/users/control-panel/user-control-panel';
import { Working } from './pages/working/working';
import { CreateUserComponent } from './pages/users/operations/create-user/create-user';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'main',
    component: BaseLayout,
    children:[  
        {path: 'user-control-panel', component: UserControlPanelComponent },
        {path: 'user-control-panel/create-user', component: CreateUserComponent },
        {path: 'user-control-panel/working', component: Working},
        {path: 'working', component: Working}
    ]},
    

];

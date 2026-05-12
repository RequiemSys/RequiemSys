import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { BaseLayout } from './pages/base-layout/base-layout';
import { UserControlPanelComponent } from './pages/users/control-panel/user-control-panel';
import { Working } from './pages/working/working';
import { CreateUserComponent } from './pages/users/operations/create-user/create-user';
import { UpdateUserComponent } from './pages/users/operations/update-user/update-user';
import { DeleteUserComponent } from './pages/users/operations/delete-user/delete-user';
import { DeleteUserModalComponent } from './pages/users/operations/delete-user/delete-user-modal/delete-user-modal';
import { UserSearchModalComponent } from './pages/users/operations/update-user/update-user-modal/update-user-modal';

export const routes: Routes = [
  { path: '', component: Login },
  {
    path: 'main',
    component: BaseLayout,
    children:[
        {path: 'user-control-panel', component: UserControlPanelComponent },
        {path: 'user-control-panel/update-user', component: UpdateUserComponent },
        {path: 'user-control-panel/search-user', component: UserSearchModalComponent },
        {path: 'user-control-panel/create-user', component: CreateUserComponent },
        {path: 'user-control-panel/delete-user', component: DeleteUserComponent},
        {path: 'user-control-panel/delete-user', component: DeleteUserModalComponent},
        {path: 'user-control-panel/working', component: Working},
        {path: 'working', component: Working}
    ]},


];

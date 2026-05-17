import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { BaseLayout } from './pages/base-layout/base-layout';
import { UserControlPanelComponent } from './pages/users/control-panel/user-control-panel';
import { Working } from './pages/working/working';
import { CreateUserComponent } from './pages/users/operations/create-user/create-user';
import { UpdateUserComponent } from './pages/users/operations/update-user/update-user';
import { DeleteUserComponent } from './pages/users/operations/delete-user/delete-user';
import { ViewUserComponent } from './pages/users/operations/view-user/view-user';
import { UserSearchModalComponent } from './pages/users/operations/update-user/update-user-modal/update-user-modal';
import { DeceasedComponent } from './pages/deceased/deceased';
import { ResponsibleComponent } from './pages/responsible/responsible';
import { BurialComponent } from './pages/burial/burial';
import { ExhumationComponent } from './pages/exhumation/exhumation';
import { BurialUnitComponent } from './pages/burial-unit/burial-unit';
import { DeceasedControlPanelComponent } from './modules/deceased/control-panel/deceased-control-panel';
import { CreateDeceasedComponent } from './modules/deceased/operations/create-deceased/create-deceased';
import { UpdateDeceasedComponent } from './modules/deceased/operations/update-deceased/update-deceased';
import { ViewDeceasedComponent } from './modules/deceased/operations/view-deceased/view-deceased';
import { DeleteDeceasedComponent } from './modules/deceased/operations/delete-deceased/delete-deceased';

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
        {path: 'user-control-panel/view-user', component: ViewUserComponent},
        {path: 'working', component: Working},
        {path: 'deceased', component: DeceasedControlPanelComponent},
        {path: 'deceased-create', component: CreateDeceasedComponent},
        {path: 'deceased-update', component: UpdateDeceasedComponent},
        {path: 'deceased-view', component: ViewDeceasedComponent},
        {path: 'deceased-delete', component: DeleteDeceasedComponent},
        {path: 'responsible', component: ResponsibleComponent},
        {path: 'burial', component: BurialComponent},
        {path: 'exhumation', component: ExhumationComponent},
        {path: 'burial-unit', component: BurialUnitComponent}
    ]},
];

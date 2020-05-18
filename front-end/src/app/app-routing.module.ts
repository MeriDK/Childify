import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent} from './login-page/login-page.component';
import { TaskComponent } from "./task/task.component";
import { TaskAddComponent } from "./task-add/task-add.component";
import { TaskInfoComponent } from "./task-info/task-info.component";
import { TaskInfoChangeComponent } from "./task-info-change/task-info-change.component";
import { FamilyPageComponent } from "./family-page/family-page.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationAddCreateFamilyComponent } from "./registration-add-create-family/registration-add-create-family.component";
import { ShopListComponent } from './shop-list/shop-list.component';
import { HomeComponent } from './home/home.component';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';
import { LoginComponent } from './login/login.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'new-login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'connect-family',
    component: RegistrationAddCreateFamilyComponent
  },
  {
    path: 'family',
    component: FamilyPageComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'task/add',
    component: TaskAddComponent
  },
  {
    path: 'task/change/:id',
    component: TaskInfoChangeComponent
  },
  {
    path: 'task/info/:id',
    component: TaskInfoComponent
  },
  {
    path: 'shop',
    component: ShopListComponent
  },
  {
    path: 'statistic',
    component: UserStatisticComponent
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

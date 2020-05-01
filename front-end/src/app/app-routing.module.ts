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


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
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
    path: 'task/change',
    component: TaskInfoChangeComponent
  },
  {
    path: 'task/info',
    component: TaskInfoComponent
  },
  {
    path: 'shop',
    component: ShopListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { LoginPageComponent} from "./login-page/login-page.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { FamilyPageComponent } from "./family-page/family-page.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationAddCreateFamilyComponent } from "./registration-add-create-family/registration-add-create-family.component";


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
    path: 'family-connection',
    component: RegistrationAddCreateFamilyComponent
  },
  {
    path: 'family',
    component: FamilyPageComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

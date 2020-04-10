import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginTitleComponent } from './login-title/login-title.component';
import { CheckTaskComponent } from './check-task/check-task.component';
import { ChildTaskComponent } from './child-task/child-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { RegistrationAndCreateFamilyComponent } from './registration-and-create-family/registration-and-create-family.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FamilyPageComponent } from './family-page/family-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginTitleComponent,
    CheckTaskComponent,
    ChildTaskComponent,
    TaskListComponent,
    TaskComponent,
    DynamicComponentServComponent,
    RegistrationAndCreateFamilyComponent,
    RegistrationComponent,
    NavMenuComponent,
    FamilyPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabsModule } from "ngx-bootstrap/tabs";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { LoginTitleComponent } from "./login-title/login-title.component";
import { CheckTaskComponent } from "./check-task/check-task.component";
import { ChildTaskComponent } from "./child-task/child-task.component";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { FamilyPageComponent } from "./family-page/family-page.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationAddCreateFamilyComponent } from "./registration-add-create-family/registration-add-create-family.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginTitleComponent,
    CheckTaskComponent,
    ChildTaskComponent,
    CreateTaskComponent,
    FamilyPageComponent,
    NavMenuComponent,
    RegistrationComponent,
    RegistrationAddCreateFamilyComponent,
    TaskComponent,
    TaskListComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent, TaskComponent, TaskListComponent, RegistrationComponent]
})
export class AppModule { }

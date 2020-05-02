import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TabsModule } from "ngx-bootstrap/tabs";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FamilyPageComponent } from "./family-page/family-page.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationAddCreateFamilyComponent } from "./registration-add-create-family/registration-add-create-family.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskInfoChangeComponent } from './task-info-change/task-info-change.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskChildComponent } from './task-child/task-child.component';
import { TaskCheckComponent } from './task-check/task-check.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
    FamilyPageComponent,
    NavMenuComponent,
    RegistrationComponent,
    RegistrationAddCreateFamilyComponent,
    TaskComponent,
    TaskListComponent,
    LoginPageComponent,
    ShopListComponent,
    TaskAddComponent,
    TaskInfoChangeComponent,
    TaskInfoComponent,
    TaskChildComponent,
    TaskCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    AngularSvgIconModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent, /*TaskComponent, TaskListComponent, RegistrationComponent, ShopListComponent*/]//now using only in routing
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginTitleComponent } from './login-title/login-title.component';
import { CheckTaskComponent } from './check-task/check-task.component';
import { ChildTaskComponent } from './child-task/child-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginTitleComponent,
    CheckTaskComponent,
    ChildTaskComponent,
    TaskListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

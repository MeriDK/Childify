import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [ApiService]
})
export class LoginPageComponent implements OnInit {
  loginForm: any;
  username: FormControl;
  password: FormControl;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(): void {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  loginUser(): void {
    var data = {
      "username": this.username.value,
      "password": this.password.value
    };
  }
}

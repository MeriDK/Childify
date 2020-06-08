import { Component, Input, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import ValidateServ from '../services/ValidateServ';
import $ from 'node_modules/jquery';
import { registerNewUser } from './registerNewUser';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.sass'],
  providers: [RegistrationService]
})
export class NewRegistrationComponent implements OnInit {

  @Input() myvalidator: ValidatorFn;
  registrationForm: any;
  email: FormControl;
  password: FormControl;
  activeImg = 1;

  constructor(private api: RegistrationService, private token: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.initFormControl();
  }

  initFormControl(): void {
    this.email = new FormControl('', ValidateServ.validateEmail);
    this.password = new FormControl('', ValidateServ.validatePassword);

    this.registrationForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  registerNewUser(): void {
    if (this.registrationForm.invalid) { return; }
    var data = {
      email: this.email.value,
      password: this.password.value,
      isParent: $('.radio-group__check-box--parent')[0].checked,
      numIcon: this.activeImg
    };
    registerNewUser(this.api, this.token, data, this.router);
  }
}

import { Component, OnInit, Input} from '@angular/core';
import anime from 'node_modules/animejs'
import $ from 'node_modules/jquery'
import  {registerNewUser}  from './registrationService'
import { RegistrationService } from './registration.service';
import { TokenService } from '../token.service'
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import  ValidateServ from '../ValidateServ' ;
import {translate} from '../services/StringResourses'


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  
  translate = translate

  @Input() myvalidator:ValidatorFn;
  registrationForm : any;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private api: RegistrationService, private token :TokenService) {}

  ngOnInit(): void {
    this.initAnime()
    this.initFormControl()
  }

  initFormControl(): void {
    this.username = new FormControl('', ValidateServ.validateUsername)
    this.email =  new FormControl('', ValidateServ.validateEmail)
    this.password  = new FormControl('', ValidateServ.validatePassword)
    this.confirmPassword = new FormControl('', ValidateServ.validatePassword)

    this.registrationForm = new FormGroup({
      inputGroup: new FormGroup({
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })
    })
  }

  initAnime(): void {
    anime({
      targets: '.svg_path--logo',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1200,
      fill: '#a082a8',
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: true
    });
  }

  registerNewUser(): void {
    var data = {
      "username" : this.username.value,
      "email" : this.email.value,
      "password": this.password.value,
      "isParent": $(".input-radio--registration__parent").is(':checked')
    }
    registerNewUser(this.api, this.token, data)
  }
}

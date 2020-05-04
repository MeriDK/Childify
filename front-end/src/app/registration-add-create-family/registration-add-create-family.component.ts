import { Component, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import  {createNewFamily, connectToFamily}  from './registrationService'
import { RegistrationAddService } from './registration-add.service';
import {translate} from '../services/StringResourses'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-add-create-family',
  templateUrl: './registration-add-create-family.component.html',
  styleUrls: ['./registration-add-create-family.component.scss','../registration/registration.component.scss'],
  providers: [RegistrationAddService]
})
export class RegistrationAddCreateFamilyComponent implements AfterViewInit {

  isChild= !jwt_decode(this.token.getAccess()).isParent;
  data : any;
  isCreate : boolean;

  translate = translate

  constructor(private api: RegistrationAddService, private token :TokenService,
    private router: Router) {
    this.data = {family_id: '', name: ''}
  }

  ngAfterViewInit(): void {
    this.setAccessToCreate()
  }

  setAccessToCreate(): void {
    if(this.isChild) {
      $("li.tab--create").css("cursor", "no-drop")
      $("li.tab--create").children().addClass("disabled")
    }
  }

  connectCreateFamily(): void {
    if (this.isCreate) {
      createNewFamily(this.api, this.token, {name: this.data.name}, this.router)
    }
    else {
      connectToFamily(this.api, this.token, {family_id: this.data.family_id}, this.router)
    }
  }
}

import { Component, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import  {createNewFamily, connectToFamily}  from './registrationService'
import { RegistrationAddService } from './registration-add.service';
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-registration-add-create-family',
  templateUrl: './registration-add-create-family.component.html',
  styleUrls: ['./registration-add-create-family.component.scss','../registration/registration.component.scss'],
  providers: [RegistrationAddService]
})
export class RegistrationAddCreateFamilyComponent implements AfterViewInit {

  isChild: any;
  data : any;
  isCreate : boolean;

  translate = translate

  constructor(private api: RegistrationAddService) {
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
      createNewFamily(this.api, {name: this.data.name})
    }
    else {
      connectToFamily(this.api, {family_id: this.data.family_id})
    }
  }
}

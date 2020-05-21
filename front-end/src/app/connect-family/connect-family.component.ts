import {AfterViewInit, Component, OnInit} from '@angular/core';
import { RegistrationAddService } from './registration-add.service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import $ from 'node_modules/jquery';
import { connectToFamily, createNewFamily } from './connect.service';

@Component({
  selector: 'app-connect-family',
  templateUrl: './connect-family.component.html',
  styleUrls: ['./connect-family.component.sass'],
  providers: [RegistrationAddService]
})
export class ConnectFamilyComponent implements AfterViewInit {

  isChild = !jwt_decode(this.token.getAccess()).isParent;
  data: any;
  isCreate: boolean;

  constructor(private api: RegistrationAddService, private token: TokenService,
              private router: Router) {
    this.data = {family_id: '', username: ''};
  }

  ngAfterViewInit(): void {
    this.setAccessToCreate();
  }

  setAccessToCreate(): void {
    if (this.isChild) {
      $('li.tab--create').css('cursor', 'no-drop');
      $('li.tab--create').children().addClass('disabled');
    }
  }

  connectCreateFamily(): void {
    if (this.isCreate) {
      createNewFamily(this.api, this.token, {username: this.data.username}, this.router);
    }
    else {
      connectToFamily(this.api, this.token, {username: this.data.username, family_id: this.data.family_id}, this.router);
    }
  }
}

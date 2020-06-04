import {AfterViewInit, Component, OnInit} from '@angular/core';
import { RegistrationAddService } from './registration-add.service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import $ from 'node_modules/jquery';
import { connectToFamily, createNewFamily } from './connect.service';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-connect-family',
  templateUrl: './connect-family.component.html',
  styleUrls: ['./connect-family.component.sass'],
  providers: [RegistrationAddService]
})
export class ConnectFamilyComponent implements OnInit {

  // isChild = !jwt_decode(this.token.getAccess()).isParent;
  isParent = true;
  isCreate = false;
  data: any;
  private formBuilder: any;

  constructor(private api: RegistrationAddService, private token: TokenService,
              private router: Router) {
    this.data = {family_id: '', username: ''};
  }

  ngOnInit(): void {
    this.data = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
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

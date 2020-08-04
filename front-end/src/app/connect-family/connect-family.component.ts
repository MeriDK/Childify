import { Component, OnInit} from '@angular/core';
import { RegistrationAddService } from './registration-add.service';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { connectToFamily, createNewFamily } from './connect.service';


@Component({
  selector: 'app-connect-family',
  templateUrl: './connect-family.component.html',
  styleUrls: ['./connect-family.component.sass', '../registration/registration.component.sass'],
  providers: [RegistrationAddService]
})
export class ConnectFamilyComponent {

  isParent = jwt_decode(this.token.getAccess()).isParent;
  isCreate = false;
  data: any;
  private formBuilder: any;

  constructor(private api: RegistrationAddService, private token: TokenService, private router: Router) {
    this.data = { family_id: '', username: '', password: '' };
  }

  connectCreateFamily(): void {
    if ((!this.data.username || !this.data.password) || !this.isCreate && !this.data.family_id) {
      return;
    } else if (this.isCreate) {
      createNewFamily(this.api, this.token, {username: this.data.username, password: this.data.password}, this.router);
    }
    else {
      connectToFamily(this.api, this.token, {username: this.data.username, family_id: this.data.family_id, password: this.data.password}, this.router);
    }
  }
}

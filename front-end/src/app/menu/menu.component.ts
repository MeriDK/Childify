import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import $ from 'node_modules/jquery'
import { SettingsService } from '../settings-page/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor( private tokenService: TokenService, private router: Router, private settingsService: SettingsService) { }

  user = {
    username: 'Your Username',
    email: 'Your Email',
    family_id: 'Your Family Id',   // should be family code in future
    numIcon: 1
  };
  $ = $
  getTokenService(): any {
    return this.tokenService
  }

  getRouter(): any {
    return this.router
  }

  ngOnInit(): void {
    this.settingsService.getUserInfo()
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          if (error.status === 401) {
            // refresh access
          }
        }
      );
  }

  

}

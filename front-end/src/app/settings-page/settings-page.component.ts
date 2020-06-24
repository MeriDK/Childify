import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../../package.json';
import { SettingsService } from './settings.service';
import $ from 'node_modules/jquery'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.sass', '../registration/registration.component.sass'],
  providers: [SettingsService]
})
export class SettingsPageComponent implements OnInit {

  $=$
  user = {
    username: 'Your Username',
    email: 'Your Email',
    family_id: 'Your Family Id',   // should be family code in future
    numIcon: 1
  };
  id: number;

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    // get user data
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

  onSubmit(): void {
    // save changes
    this.settingsService.patchUserInfo({
      username: this.user.username,
      email: this.user.email,
      numIcon: this.user.numIcon
    }).subscribe();
  }

  showId(): void {
    alert(this.user.family_id);
  }

  onDeleteFamily(): void {
    // remove user from family
    this.settingsService.deleteUserFamily()
      .subscribe(
        () => this.router.navigate(['connect-family'])
      );
  }

  userNameInputHandler(event: any): void {
    this.user.username = event.target.value;
  }

  emailInputHandler(event: any): void {
    this.user.email = event.target.value;
  }
}

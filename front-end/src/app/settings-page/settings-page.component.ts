import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  @Input() username: String = 'Your username';
  @Input() email: String = 'Your email';

  user = jwt_decode(this.tokenService.getAccess())
  familyId: String = 'Please try again';
  familyIdBtnText: String = "Дізнатися ID сім'ї";
  saveBtnText: String = "Зберегти";
  
  ngOnInit(): void {
    this.getUserInfo().then((val) => {
      this.username = val['username'];
      this.email = val['email'];
      this.familyId = val['family_id'];
    })
  }

  onSaveClick(): void {
    // alert('Are you, ' + this.username + ', wanna get email on ' + this.email + '?');
    this.patchUserInfo().then((val) => {
      console.log(val);
    
      var tempMessage = this.saveBtnText;
      this.saveBtnText =  val['code'] == 200 ? '0.0 Збережено!': 'Виникли проблеми Т.Т';
      setTimeout(() => {
      this.saveBtnText = tempMessage;
      }, 3000);
    
    })
  }

  patchUserInfo(): Promise<any> {
  let promise = new Promise((resolve, reject) =>{
    console.log(this.user.user_id);
    var data = {
      username: this.username,
      email: this.email
    };

    var json = JSON.stringify(data);

    this.http.patch(this.baseUrl + '/user/'+ this.user.user_id + '/settings', json, this.httpHeaders()).subscribe(value => {
      resolve(value);
    }, error => {
      console.log("There is a problems with network");
      reject();
    });
  });
  return promise;
}

  userNameInputHandler(event: any): void {
    const value = event.target.value;
    this.username = value;
  }

  emailInputHandler(event: any): void {
    const value = event.target.value;
    this.email = value;
  }

  getUserInfo(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      console.log(this.user.user_id);
      
      this.http.get(this.baseUrl + '/user/'+ this.user.user_id + '/settings', this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  showId(): void {
    var tempMessage = this.familyIdBtnText;
    this.familyIdBtnText = this.familyId;
    setTimeout(() => {
      this.familyIdBtnText = tempMessage;
    }, 3000);
    
  }

}

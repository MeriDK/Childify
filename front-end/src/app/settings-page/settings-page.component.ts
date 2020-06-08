import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import config from  '../../../../package.json'

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private router: Router) { }

  @Input() username: String = 'Your username';
  @Input() email: String = 'Your email';

  user = jwt_decode(this.tokenService.getAccess())
  familyId: String = 'Please try again';
  familyIdBtnText: String = "Дізнатися ID сім'ї";
  saveBtnText: String = 'Зберегти';
  rejectBtnText: String = "Вийти з сім'ї";
  
  ngOnInit(): void {
    this.getUserInfo().then((val) => {
      this.username = val['username'];
      this.email = val['email'];
      this.familyId = val['family_id'];
      console.log("HERE IS YORE PROBLEM =>" + val['family_id']);
      if (this.familyId == null) {
        this.router.navigate(['/connect-family']);
      }
    }, (err) => {
      console.log(err);
      if (err.status == 401){
        //this.router.navigate(['/login']);
      }
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
    
    });
  }

  onRejectClick(): void {
    this.deleteFamily().then((val) => {
      console.log(val);
    
      var tempMessage = this.rejectBtnText;
      this.rejectBtnText =  val['code'] == 200 ? '0.0 Збережено!': 'Виникли проблеми Т.Т';
      setTimeout(() => {
      this.rejectBtnText = tempMessage;
      this.router.navigate(['/connect-family']);
      }, 3000);
      
    });
  }

  deleteFamily(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      console.log(this.user.user_id);
  
      this.http.delete(config['baseURL'] + '/user/'+ this.user.user_id + '/settings', this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        if (error.status == 401) {
          this.refreshToken();
        }
        console.log("There is a problems with network");
        reject();
      });
    });
    return promise;
  }

  patchUserInfo(): Promise<any> {
  let promise = new Promise((resolve, reject) =>{
    console.log(this.user.user_id);
    var data = {
      username: this.username,
      email: this.email
    };

    var json = JSON.stringify(data);

    this.http.patch(config['baseURL'] + '/user/'+ this.user.user_id + '/settings', json, this.httpHeaders()).subscribe(value => {
      resolve(value);
    }, error => {
      if (error.status == 401) {
        this.refreshToken();
      }
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

  refreshToken(): boolean {
    this.refresh().then((val)=>{
      //console.log("GOOOOOOOOOOOOOD\n" + val['access']);
      this.tokenService.setCookie({'access':val['access']})  
    }, (err) => {
        console.log(err);
        return false;
      });
    return true;
  }

  getUserInfo(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      console.log(this.user.user_id);
      
      this.http.get(config['baseURL'] + '/user/'+ this.user.user_id + '/settings', this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        if (error.status == 401) {
          this.refreshToken();
        }
        reject(error);
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

  refresh(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      console.log(this.user.user_id);
      
      var data = {
        refresh: this.tokenService.getRefresh()
      };
  
      var json = JSON.stringify(data);

      this.http.post(config['baseURL'] + '/login/refresh/', json, this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        reject(error);
      });
    });
    return promise;
  }

}

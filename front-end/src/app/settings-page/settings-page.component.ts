import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}};

  constructor(private http: HttpClient) { }

  @Input() username: String = 'Your username';
  @Input() email: String = 'Your email';
  familyId: String = 'Please try again';
  
  ngOnInit(): void {
    this.getUserInfo().then((val) => {
      this.username = val['username'];
      this.email = val['email'];
      this.familyId = val['family_id'];
    })
  }

  onSaveClick(): void {
    alert('Are you, ' + this.username + ', wanna get email on ' + this.email + '?');
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
      this.http.get(this.baseUrl + '/user/4/settings').subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }

  showId(): void {
    alert(this.familyId);
  }

}

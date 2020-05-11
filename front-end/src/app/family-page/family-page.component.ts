import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode'

import { FamilyMember } from '../family-member/family-member.component';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { SettingsPageComponent } from '../settings-page/settings-page.component';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})

@Injectable()
export class FamilyPageComponent implements OnInit{

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router) { }

  private user = jwt_decode(this.tokenService.getAccess())
  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  data : Observable<any>;
  
  rec : any;

  imgYoung = "../../assets/svg/daughter.svg";
  imgOld = "../../assets/svg/grandfather.svg";

  members: FamilyMember[];

  ngOnInit(): void {

    this.getMembers().then((val) => {
      console.log(val);
      this.members = this.parseMembers(val);
    },
    (err) => {
      console.log(err);
      
      
        this.refreshToken();
      
    });

    console.log("HERE\n" + this.members)
  }
  
  getMembers(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/family/1', this.httpHeaders()).subscribe(value => {
        resolve(value['family']);
      }, error => {
        
          this.refreshToken();
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }
  
  parseMembers(value): FamilyMember[] {
    var family: FamilyMember[];

    value.forEach(element => {
      var memb: FamilyMember = {
      
        name: element['username'],
        memberUrl: this.baseUrl + '/family/${element[user_id]/statistic',
        imgUrl: element['is_parent']? this.imgOld : this.imgYoung
      }

      console.log('Memb: ' + memb);
      if (!family)
        family = [memb];
      else {
        console.log('Family inter:' + family); 
        family.push(memb);
      }
        
    });

    return family;
  }

  //bad idia

  refreshToken(): boolean {
    this.refresh().then((val)=>{
      this.tokenService.setCookie({'access':val['access']})  
    }, (err) => {
        console.log(err);
        return false;
      });
    return true;
  }

  refresh(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      console.log(this.user.user_id);
      
      var data = {
        refresh: this.tokenService.getRefresh()
      };
  
      var json = JSON.stringify(data);

      this.http.post(this.baseUrl + '/login/refresh/', json, this.httpHeaders()).subscribe(value => {
        resolve(value);
      }, error => {
        console.log("There is a prob with network");
        reject(error);
      });
    });
    return promise;
  }

}
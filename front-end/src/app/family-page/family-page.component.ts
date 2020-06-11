import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode'

import { FamilyMember, FamilyChild } from '../family-member/family-member.component';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { SettingsPageComponent } from '../settings-page/settings-page.component';
import config from  '../../../../package.json'

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

  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  data : Observable<any>;
  
  rec : any;

  imgYoung = "../../assets/svg/kid.svg";
  imgOld = "../../assets/svg/any_avatar.svg";

  children: FamilyChild[];
  parents: FamilyMember[];

  ngOnInit(): void {

    this.getMembers().then((val) => {
      console.log(val);
      this.children = this.parseChildren(val);
      this.parents = this.parseParents(val);
      console.log("Parents\n"+ this.parents);
    },
    (err) => {
      console.log(err);
      this.refreshToken();
    });

    console.log("HERE\n" + this.children)
    
  }
  
  getMembers(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(config['baseURL'] + '/family/' + this.user.user_id, this.httpHeaders()).subscribe(value => {
        resolve(value['family']);
      }, error => {
        
          this.refreshToken();
        
        console.log("There is a prob with network");
        reject();
      });
    });
    return promise;
  }
  
  parseChildren(value): FamilyChild[] {
    var family: FamilyChild[];

    value.forEach(element => {
      if (!element['is_parent']) {
        var memb: FamilyChild = {
        
          name: element['username'],
          memberUrl: config['baseURL'] + '/family/${element[user_id]/statistic',
          imgUrl: this.imgYoung,
          points: element['statistic']['points'],
          rewards: element['statistic']['rewards'],
          tasks: {
            accomplished: element['statistic']['tasks']['accomplised'],
            selected: element['statistic']['tasks']['selected'],
            canceled: element['statistic']['tasks']['canceled']
          }
        }

        console.log('Memb: ' + memb);
        if (!family)
          family = [memb];
        else {
          console.log('Family inter:' + family); 
          family.push(memb);
        }
    }
    });

    return family;
  }

  parseParents(value): FamilyMember[] {
    var parents: FamilyMember[];

    value.forEach(element => {

      if(element['is_parent']) {
        if (parents){
          parents.push({name: element['username'], memberUrl: config['baseURL'] + '/family/${element[user_id]/statistic', imgUrl: this.imgOld});
        } else {
          parents = [{name: element['username'], memberUrl: config['baseURL'] + '/family/${element[user_id]/statistic', imgUrl: this.imgOld}];
        }
      }
        
    });

    return parents;
  }

  //bad idia

  refreshToken(): boolean {
    this.refresh().then((val)=>{
      this.tokenService.setCookie({'access':val['access']});  
      this.getMembers().then((val) => {
        console.log(val);
        this.children = this.parseChildren(val);
        this.parents = this.parseParents(val);
        console.log("Parents\n"+ this.parents);
      }, (err) => {
        alert('There is problems with internet. Please, reload page.');
      });
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
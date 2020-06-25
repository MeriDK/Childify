import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import $ from 'node_modules/jquery'
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

  $=$

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router) { 

    if (!this.tokenService.getRefresh()){
      this.router.navigate(['../login'])
      return
    } else {
      this.tokenService.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
        return
      })
    }
    if (!this.tokenService.getAccess()) {
      this.tokenService.refreshTokenSubs().then(() => {
        tokenService.logout();
        this.router.navigate(['/login']);
      },(err) => {
        this.router.navigate(['/login']);
      });
    }
    this.initHeaders();
    }

  private user;

  public httpHeaders;

  data : Observable<any>;
  
  rec : any;

  imgYoung = "../../assets/svg/kid.svg";
  imgOld = "../../assets/svg/any_avatar.svg";

  children: FamilyChild[];
  parents: FamilyMember[];

  ngOnInit(): void {
    
    this.showMembers();
  }

  initHeaders() {
    if (!this.tokenService.getAccess()){
      this.router.navigate(['/login']);
    }
    this.user = jwt_decode(this.tokenService.getAccess());
    this.httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
    'Authorization':'Bearer '+ this.tokenService.getAccess()})}}
  }

  showMembers(): void {
    this.initHeaders();

    this.getMembers().then((val) => {
      console.log(val);
      this.children = this.parseChildren(val);
      this.parents = this.parseParents(val);
      console.log("Parents\n"+ this.parents);
    },
    (err) => {
      console.log(err);
      if (err.status == 401){
        this.tokenService.refreshTokenSubs().then(() => {
          this.initHeaders();

          this.getMembers().then((val) => {
            console.log(val);
            this.children = this.parseChildren(val);
            this.parents = this.parseParents(val);
            console.log("Parents\n"+ this.parents);
          }, (err) => {
            this.router.navigate(['/login']);
          });
        },(err) => {
          this.router.navigate(['/login']);
        }); 
      } else {
        setTimeout(() => {
          this.showMembers();
        }, 5000);
      }
    });

    console.log("HERE\n" + this.children)
    
  }
  
  getMembers(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(config['baseURL'] + '/family/' + this.user.user_id, this.httpHeaders()).subscribe(value => {
        resolve(value['family']);
      }, error => {
          console.log(error.status);
        
        console.log("There is a prob with network");
        reject(error);
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
          imgUrl: this.chooseImg(element['numIcon']),
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
          parents.push({name: element['username'], memberUrl: config['baseURL'] + '/family/${element[user_id]/statistic', imgUrl: this.chooseImg(element['numIcon'])});
        } else {
          parents = [{name: element['username'], memberUrl: config['baseURL'] + '/family/${element[user_id]/statistic', imgUrl: this.chooseImg(element['numIcon'])}];
        }
      }
        
    });

    return parents;
  }

  chooseImg(num): string {
    return '../../assets/svg/' + num + '.svg';
  }

}
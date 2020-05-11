import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FamilyMember } from '../family-member/family-member.component';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})

@Injectable()
export class FamilyPageComponent implements OnInit{

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}};

  data : Observable<any>;
  
  rec : any;

  imgYoung = "../../assets/svg/daughter.svg";
  imgOld = "../../assets/svg/grandfather.svg";

  members: FamilyMember[];

  ngOnInit(): void {

    this.getMembers().then((val) => {
      console.log(val);
      this.members = this.parseMembers(val);
    });

    console.log("HERE\n" + this.members)
  }
  
  getMembers(): Promise<any> {
    let promise = new Promise((resolve, reject) =>{
      this.http.get(this.baseUrl + '/family/1').subscribe(value => {
        resolve(value['family']);
      }, error => {
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

}
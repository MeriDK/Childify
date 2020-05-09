import { Component, OnInit, Injectable, AfterViewInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

import { FamilyMember, FamilyMemberComponent } from '../family-member/family-member.component';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-family-page',
  templateUrl: './family-page.component.html',
  styleUrls: ['./family-page.component.scss']
})

@Injectable()
export class FamilyPageComponent implements OnInit, AfterViewInit{

  constructor(private http: HttpClient) { }

  private readonly baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json'})}};

  data : Observable<any>;
  
  rec : any;

  imgYoung = "../../assets/svg/daughter.svg";
  imgOld = "../../assets/svg/grandfather.svg";

  @Input() members: FamilyMember[];

  ngOnInit(): void {
    while(!this.members)
      this.members = this.getMembers();
      
    console.log("HERE\n" + this.members)
  }

  ngAfterViewInit(): void {
    console.log("Yeap");
    // this.members = this.getMembers();
  }

  getMembers():FamilyMember[] {
    let family: FamilyMember[];

     this.http.get(this.baseUrl + '/family/1').subscribe(value => { 
    console.log(value['family']);
    
    value['family'].forEach(element => {
      let memb: FamilyMember = {
      name: element['username'],
      memberUrl: this.baseUrl + '/family/${element[user_id]/statistic',
      imgUrl: value['is_parent']? this.imgOld : this.imgYoung
      }

      console.log(memb);
      if (!family)
        family = [memb];

        console.log(family); 
      family.push(memb);
    });
    return family;
    }, 
    error => {
      console.log("Request error")
    });

    return family;
  }


}

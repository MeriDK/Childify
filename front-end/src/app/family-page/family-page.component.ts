import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

import { FamilyMember, FamilyMemberComponent } from '../family-member/family-member.component';
import { async } from '@angular/core/testing';
import { rejects } from 'assert';

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

  members: FamilyMember[];

  ngOnInit(): void {

    this.members = [
      {name: "useruser", memberUrl: "http://127.0.0.1:8000/family/${element[user_id]/statistic", imgUrl: "../../assets/svg/daughter.svg"},
      {imgUrl: "../../assets/svg/daughter.svg",memberUrl: "http://127.0.0.1:8000/family/${element[user_id]/statistic",name: "childchild"}
    ]

    /*const shit = this.getMembers().then(
      response => this.members = response,
      error => console.log("Damn this shit")
    );*/

    console.log("HERE\n" + this.members)
  }

  ngAfterViewInit(): void {
    console.log("Yeap");
    // this.members = this.getMembers();
  }


  
  
  getMembers(): Promise<FamilyMember[]> {
    var family: FamilyMember[];  
    return new Promise(function(resolve, rej){


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
    resolve(this.family)
    }, 
    error => {
      console.log("Request error")
      rej(new Error("Network Error"))
    });
    })


  }


}
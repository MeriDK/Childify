import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

export interface FamilyMember {
  imgUrl: string
  memberUrl: string
  name: string
}

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit, AfterViewInit {

  @Input() familyMember: FamilyMember;

  constructor() { }
  
  ngAfterViewInit(): void {
    console.log("FAMILY");
  }

  ngOnInit(): void {
  }

}

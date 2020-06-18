import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

export interface FamilyMember {
  imgUrl: string
  memberUrl: string
  name: string
}

export interface FamilyChild {
  imgUrl: string
  memberUrl: string
  name: string
  points: number
  rewards: number
  tasks: {
    accomplished: number
    selected: number
    canceled: number
  }
}

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit, AfterViewInit {

  @Input() familyChild: FamilyChild;

  constructor() { }
  
  ngAfterViewInit(): void {
    console.log("FAMILY");
  }

  ngOnInit(): void {
  }

}

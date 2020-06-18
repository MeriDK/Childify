import { Component, OnInit, Input } from '@angular/core';

export interface Event {
  title: string
  status: string
  points: number
  time: string
  categoryImg: string
  imgUrl: string
}

@Component({
  selector: 'app-family-recent-item',
  templateUrl: './family-recent-item.component.html',
  styleUrls: ['./family-recent-item.component.scss']
})
export class FamilyRecentItemComponent implements OnInit {

  @Input() event: Event

  constructor() { }

  ngOnInit(): void {
  }

}

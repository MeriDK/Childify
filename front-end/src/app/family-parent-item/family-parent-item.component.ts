import { Component, OnInit, Input } from '@angular/core';
import { FamilyMember } from '../family-member/family-member.component';

@Component({
  selector: 'app-family-parent-item',
  templateUrl: './family-parent-item.component.html',
  styleUrls: ['./family-parent-item.component.scss']
})
export class FamilyParentItemComponent implements OnInit {

  @Input() parent: FamilyMember;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: '../user-icon/user-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent implements OnInit {
  @Input() ico
  constructor() { }

  ngOnInit(): void {
  }

}

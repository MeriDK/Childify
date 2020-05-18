import { Component, OnInit, Input } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-shop-prize-icon',
  templateUrl: './shop-prize-icon.component.html',
  styleUrls: ['./shop-prize-icon.component.scss']
})
export class ShopPrizeIconComponent implements OnInit {

  @Input() ico
  constructor() { }

  ngOnInit(): void {
  }

}

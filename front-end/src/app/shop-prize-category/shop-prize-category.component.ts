import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shop-prize-category',
  templateUrl: './shop-prize-category.component.html',
  styleUrls: ['./shop-prize-category.component.scss']
})
export class ShopPrizeCategoryComponent implements OnInit {

  constructor() { }

  @Input() numCategory;

  ngOnInit(): void {
  }

}

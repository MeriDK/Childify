import { Component, OnInit } from '@angular/core';
import $ from 'node_modules/jquery'

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.addEventListener()
  }

  addEventListener(): void {
    $(".good-li--shop-list").on('click',  (event) => { this.selectElement(event)})
  }

  selectElement(event): void {
    var element=event.target
    if(element.localName!='div' && element.localName!='li') {
      element = element.parentNode
    }
    if(element.localName!='li') {
      element = element.parentNode
    }
    if(element.localName=='li'){
      $(element).toggleClass('selected');
    }
    this.showButton()
  }

  showButton(): void {
    if($('.selected').length) {
      $('.btn-div-footer--shop-list').css('display','flex')
    } else {
      $('.btn-div-footer--shop-list').css('display','none')
    }
  }

}

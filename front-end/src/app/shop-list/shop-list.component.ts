import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements AfterViewInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent= false
  translate = translate
  wishGoods = [
    {
      "title":"Title",
      "about":"aboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutaboutabout",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    }
  ]
  orderGoods = [
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    }
  ]
  receiveGoods = [
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },
    {
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    },{
      "title":"Title",
      "about":"about",
      "points":"124",
      "child":"oleh"
    }
  ]

  constructor() { }

  ngAfterViewInit(): void {
    this.addEventListener();
  }

  addEventListener(): void {
    $(".good-li--shop-list").on('click',  (event) => { this.selectElement(event.target)})
    $(".btn-add--shop-list").on('click',  (event) => { 
      $(".add-good-li--shop-list").toggleClass("shown")
      window.scrollTo(0,0);
    })
    $(".btn-add-good").on('click', (event) => {
      $(".add-good-li--shop-list").toggleClass("shown")
    })
    $(".btn-wish-good").on('click', (event) => { this.selectElement(event.target.parentNode.parentNode) })
    $(".btn-confirm-good").on('click', (event) => { this.selectElement(event.target.parentNode.parentNode) })
    
  }

  selectElement(element): void {
    if(element.localName!='div' && element.localName!='li') {
      element = element.parentNode
    }
    if(element.localName!='li') {
      element = element.parentNode
    }
    if(element.localName=='li'){
      $(element).toggleClass('selected');
      var scrollY=window.scrollY;
      var scrollBy;
      if($(element)[0].getBoundingClientRect().x>100){
        scrollBy=$(element)[0].getBoundingClientRect().y-115+140
        window.scrollBy(0,scrollBy);
      } else {
        scrollBy=$(element)[0].getBoundingClientRect().y-115
        window.scrollBy(0,scrollBy);
      }
      if(window.scrollY-scrollY!=scrollBy)
      setTimeout(()=>{
        window.scrollBy(0,scrollBy-(window.scrollY-scrollY));
      },700)
    }
  }
  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }
}

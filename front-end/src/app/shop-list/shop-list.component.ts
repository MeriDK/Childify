import { Component, OnInit, ViewChild } from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { FormControl, FormGroup } from '@angular/forms';
import {addNewGood, getWishList, addNewGoodChild, getWishListChild} from './ShopService';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  providers: [ShopService]
})
export class ShopListComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent= true
  points = 100
  translate = translate

  
  title: FormControl;
  about: FormControl;
  price: FormControl;
  goodForm : any;

  wishGoods :  any;
  orderGoods : any;
  receiveGoods : any;

  constructor(private api: ShopService) { }

  ngOnInit(): void {
    this.getData();
    this.initFormControl()
  }

  initFormControl(): void {
    this.title = new FormControl('')
    this.about =  new FormControl('')
    this.price  = new FormControl('')

    this.goodForm = new FormGroup({
      inputGroup: new FormGroup({
        title: this.title,
        about: this.about,
        price: this.price
      })
    })
  }

  addEventListener(): void {
    $(".good-li--shop-list").on('click',  (event) => { this.selectElement(event.target)})
    $(".btn-add--shop-list").on('click',  (event) => { this.showAddPanel()})
    $(".btn-add-good").on('click', (event) => { this.addPanelBtnOnClick() })
    $(".btn-wish-good").on('click', (event) => { this.selectElement(event.target.parentNode.parentNode) })
    $(".btn-confirm-good").on('click', (event) => { this.selectElement(event.target.parentNode.parentNode) })
    
  }

  showAddPanel(): void {
    $(".add-good-li--shop-list").toggleClass("shown")
    window.scrollTo(0,0);
  }

  addPanelBtnOnClick(): void {   
    this.addNewGood();
    $(".add-good-li--shop-list").toggleClass("shown")
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

  addNewGood(): void {
    var data = {
      "title" : this.title.value,
      "about" : this.about.value,
      "price": this.price.value
    }
    if(this.isParent) {
      addNewGood(this.api, data)
    } else {
      addNewGoodChild(this.api, data)
    }

    location.reload()
  }

  getData(): void {
    if(this.isParent){
      getWishList(this.api).then(
        data=> {this.wishGoods=data;
          this.orderGoods=data;
          this.receiveGoods=data;
        this.addEventListener();}
      );
    } else {
      getWishListChild(this.api).then(
        data=> {this.wishGoods=data;
          this.orderGoods=data;
          this.receiveGoods=data;
        this.addEventListener();}
      );
    }
  }
}

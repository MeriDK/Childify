import { Component, OnInit, ViewChild, Input, TemplateRef} from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { ShopService } from './shop.service';
import { TokenService } from '../token.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  providers: [ShopService]
})
export class ShopListComponent implements OnInit{

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent = false;
  translate = translate
  wishGoods = [
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    },
    {
      title : "Солодощі",
      points: "123"
    }
  ]
  constructor(private api: ShopService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.initEventListener();
  }

  initEventListener(): void {
    setTimeout(()=>{
      var pressTimer;
      var deselect = false;
      $('.li-selectable').on('touchend',(event)=>{
        event.stopPropagation();
        var element = event.target;
        while (element.localName!='li') {
          element = element.parentNode;
        }
        if (!$(element).hasClass('selected') && !deselect) {
          $(element).addClass('active')
          this.showModal();
        }
        clearTimeout(pressTimer);
        return false;
      })
      $('.li-selectable').on('touchstart',(event)=>{
        event.stopPropagation();
        deselect = false;
        pressTimer = window.setTimeout(()=> { 
          deselect = this.selectNode(event.target);
        },150);
        return false; 
      });
      $('.btn-move').on('click', (event)=>{
        event.stopPropagation();
        this.moveNode();
      });
      $('.btn-back').on('click', (event)=>{
        event.stopPropagation();
        this.backNode();
      });
      $('.btn-confirm').on('click', (event)=>{
        event.stopPropagation();
        this.confirmNode();
      });
      $('.btn-close').on('click', (event)=>{
        event.stopPropagation();
        this.closeEditing();
        this.closeModal();
      });    
    }, 100)
  } 

  selectNode(element): boolean {
    
    while (element.localName!='li') {
      element = element.parentNode;
    }
    $(element).toggleClass('selected');
    if ($('.selected').length>0){
      $(".footer--shop-list.tab1").addClass('active');
    } else {
      $(".footer--shop-list.tab1").removeClass('active');
    }
    return !$(element).hasClass('selected');
  }

  closeEditing(): void {
    $(".footer--shop-list.tab1").removeClass('active');
    $('.selected').removeClass('selected');
  }

  deleteNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    setTimeout(()=> {
      $(element).toggleClass('moving-start');
      setTimeout(()=> {
        $(element).toggleClass('moving');
        setTimeout(()=> {
          $(element).toggleClass('hide');
          setTimeout(()=> {
            $(element).toggleClass('hidden');
            $(".footer--shop-list.tab1").removeClass('active');
            $('.selected').removeClass('selected');
          },300)
        },200)
      },500)
    },time)    
  }

  moveNode() : void {
    this.deleteNode();
    this.closeModal();
  }

  backNode() : void {
    this.deleteNode();
    this.closeModal();
  }

  confirmNode() : void {
    this.deleteNode();
    this.closeModal();
  }

  closeModal(): void {
    var classs = "."+this.activeTab()+".active";
    $(classs).removeClass('active');
    $("li.active").removeClass('active')
  }
  showModal(): void {
    var classs = "."+this.activeTab();
    $(classs).addClass('active');
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  activeTab() {
    // @ts-ignore
    var tabId ; 
    this.staticTabs.tabs.find(tabs => {
      tabId = tabs.id       
      return tabs.active
    })
    if(tabId == "tab1") {
      return "inStock-modal"
    }
    if(tabId == "tab2") {
      return "bought-modal"
    }
    if(tabId == "tab3") {
      return "received-modal"
    }
  }
 
}

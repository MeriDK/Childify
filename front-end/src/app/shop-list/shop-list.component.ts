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
  isParent = true;
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
        this.closeEditing();
      });
      $('.btn-back').on('click', (event)=>{
        event.stopPropagation();
        this.backNode();
        this.closeEditing();
      });
      $('.btn-confirm').on('click', (event)=>{
        event.stopPropagation();
        this.confirmNode();
        this.closeEditing();
      });
      $('.btn-close').on('click', (event)=>{
        event.stopPropagation();
        this.closeModal();
        this.closeEditing();
      });    
    }, 100)
  } 

  selectNode(element): boolean {
    var activeTab = this.activeTab();
    if (activeTab!="received-modal") {
      while (element.localName!='li') {
        element = element.parentNode;
      }
      $(element).toggleClass('selected');
      if ($('.selected').length>0){
        $(".footer--shop-list."+activeTab).addClass('active');
      } else {
        $(".footer--shop-list."+activeTab).removeClass('active');
      }
      return !$(element).hasClass('selected');
    }
  }

  closeEditing(): void {
    $(".footer--shop-list").removeClass('active');
    $('.selected').removeClass('selected');
  }

  moveNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    this.closeModal();
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

  confirmNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    this.closeModal();
    setTimeout(()=> {
      $(element).toggleClass('confirm-start');
      setTimeout(()=> {
        $(element).toggleClass('confirm');
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

  backNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    this.closeModal();
    setTimeout(()=> {
      $(element).toggleClass('back-start');
      setTimeout(()=> {
        $(element).toggleClass('back');
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
  

  closeModal(): void {
    var classs = ".modal."+this.activeTab()+".active";
    $(classs).removeClass('active');
    $("li.active").removeClass('active')
  }
  showModal(): void {
    var classs = ".modal."+this.activeTab();
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

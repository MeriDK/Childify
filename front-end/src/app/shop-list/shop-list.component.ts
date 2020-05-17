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
        this.closeEditing();
      });
      $('.btn-delete').on('click', (event)=>{
        event.stopPropagation();
        this.deleteNode();
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
      $('.btn-add').on('click', (event)=>{
        event.stopPropagation();
        this.addNode();
        this.closeEditing();
      });
      $('.btn-edit').on('click', (event)=>{
        event.stopPropagation();
        this.editNode();
        this.closeEditing();
      });
      $('.btn-create').on('click', (event)=>{
        event.stopPropagation();
        this.createNode();
        this.closeEditing();
      });
      $('.category--value').on('click', (event)=>{
        event.stopPropagation();
        this.openDropdown(event.target);
      });       
    }, 100)
  }
  
  openDropdown(element): any {
    var dropdown =$(element.parentNode.querySelector('.category--value__dropdown'))
    dropdown.toggleClass('active')
    if(dropdown.hasClass('active')) {
      $('.category--value__dropdown.active .category').on('click',()=>{
      dropdown.removeClass('active')
    })} else {
      $('.category--value__dropdown.active .category').prop("onclick", null).off("click");
    }
  }

  selectNode(element): boolean {
    var activeTab = this.activeTab();
    if (activeTab!="received-modal" && !(activeTab=="bought-modal" && this.isParent)) {
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

  createNode(): void {
    this.closeModal();
  }

  deleteNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    this.closeModal();
    setTimeout(()=> {
      $(element).toggleClass('delete-start');
      setTimeout(()=> {
        $(element).toggleClass('delete');
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

  addNode(): void {
    $(".modal.add-modal").addClass('active');
  }

  editNode(): void {
    this.closeModal();
  }

  showEditModal(): void {
    $(".modal.edit-modal").addClass('active');
  }
  
  closeModal(): void {
    var classs = ".modal"+".active";
    $(classs).removeClass('active');
    $(".good-li--shop-list.active").removeClass('active')
  }
  showModal(): void {
    if(this.activeTab()=="inStock-modal" && this.isParent) {
      this.showEditModal();
    } else if(this.activeTab()=="bought-modal" && this.isParent) {
      var classs = ".modal.received-modal";
      $(classs).addClass('active');
    } else {
      var classs = ".modal."+this.activeTab();
      $(classs).addClass('active');
    }
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  activeTab() {
    // @ts-ignore
    var tabId ; 
    this.staticTabs && this.staticTabs.tabs.find(tabs => {
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
    return ""
  }
 
}

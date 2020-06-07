import { Component, OnInit, ViewChild, Input, TemplateRef} from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { ShopService } from './shop.service';
import jwt_decode from 'jwt-decode'
import { TokenService } from '../token.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { getWishList, getOrderList, getReceivedList, addItem, editItem, deleteItem, confirmItem, buyItem, returnItem} from './ShopService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
  providers: [ShopService]
})
export class ShopListComponent implements OnInit{

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent = false
  points = 0
  $=$
  translate = translate
  wishGoods = []
  orderGoods = []
  receivedGoods = []

  constructor(private api: ShopService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (!this.tokenService.getRefresh()){
      this.router.navigate(['../login'])
      return
    } else {
      this.tokenService.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
        return
      })
    }
      this.isParent = jwt_decode(this.tokenService.getAccess()).isParent;
      !this.isParent && this.tokenService.getPointsSubs().then(points => {this.points=points.points})
      this.getListData()
      $('input').prop( "disabled", true )  
      $('.add-modal input').prop( "disabled", false )
      $('.edit-modal input').prop( "disabled", false )  
  }

  getListData(): void {
    getWishList(this.api, this.tokenService, this.router).then(data=> {
      this.wishGoods=data;
      getOrderList(this.api, this.tokenService, this.router).then(data=> {
        this.orderGoods=data;
        getReceivedList(this.api, this.tokenService, this.router).then(data=> {
          this.receivedGoods=data;
          $( "div" ).off();
          this.initEventListener();
        })
      })
    }).catch(error=>{})
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
          var elementContent
          if (this.activeTab()=='inStock-modal')
            elementContent = {"id":element.id,"category":element.__ngContext__[39], "name":element.__ngContext__[40],"points":element.__ngContext__[41],"about":element.__ngContext__[38] }
          if (this.activeTab()=='received-modal')
            elementContent = {"id":element.id,"category":element.__ngContext__[38], "name":element.__ngContext__[40],"points":element.__ngContext__[41],"about":element.__ngContext__[36]}
            if (this.activeTab()=='bought-modal')
            elementContent = {"id":element.id,"category":element.__ngContext__[46], "name":element.__ngContext__[48],"points":element.__ngContext__[49],"about":element.__ngContext__[44]}
         
          this.showModal(elementContent);
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

    }, 1)
  }

   updatePoints(): any {
    !this.isParent && this.tokenService.getPointsSubs().then(async points => {
      while(this.points != points.points)
      {
        var point = Math.floor(Math.abs( points.points - this.points)/100)+1
        if(this.points < points.points)
          await this.addPoint(point)
        else
          await this.deletePoint(point)
      }
      
    })
  
  }

  addPoint(point): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.points += point
        resolve()
      }, 0.01);
    })
  }

  deletePoint(point): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.points -= point
        resolve()
      }, 0.01);
    })
  }

  
  
  openDropdown(element): any {
    var dropdown =$(element.parentNode.querySelector('.category--value__dropdown'))
    var modal =  $('.'+element.parentNode.parentNode.classList[1])
    dropdown.toggleClass('active')
    if(dropdown.hasClass('active')) {
    $('.category--value__dropdown.active .category.category1').on('click',()=>{
      modal.attr('category',1)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category2').on('click',()=>{
      modal.attr('category',2)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category3').on('click',()=>{
      modal.attr('category',3)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category4').on('click',()=>{
      modal.attr('category',4)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category5').on('click',()=>{
      modal.attr('category',5)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category6').on('click',()=>{
      modal.attr('category',6)
      dropdown.removeClass('active')
    })
    $('.category--value__dropdown.active .category.category7').on('click',()=>{
      modal.attr('category',7)
      dropdown.removeClass('active')
    })
  
  } else {
      $('.category--value__dropdown.active .category').prop("onclick", null).off("click");
    }
  }

  selectNode(element): boolean {
    var activeTab = this.activeTab();
    if (!$('.selected').length && activeTab!="received-modal" && !(activeTab=="bought-modal" && this.isParent)) {
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
    var data = {"name": $('.modal.add-modal.active .title--value').val(),
    "points":$('.modal.add-modal.active .price--value input').val(),
    "about":$('.modal.add-modal.active .about--value').val(),
    "category":$('.modal.add-modal.active').attr('category')};
    if (this.isParent) {
      addItem(this.api,data, this.tokenService, this.router).then(()=>{
        this.closeModal();
        this.getListData()
      });
    }
    
    
  }

  deleteNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    deleteItem(this.api,{"id":element[0].id}, this.tokenService, this.router)
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
    buyItem(this.api,{"id":element[0].id}, this.tokenService, this.router).then(()=>{
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
            
            this.getListData();
          },300)
        },200)
      },500)
    },time)    
    this.updatePoints()
    })
  }

  confirmNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    confirmItem(this.api,{"id":element[0].id}, this.tokenService, this.router).then(()=>{
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
            this.getListData();
          },300)
        },200)
      },500)
    },time)    
    })
  }

  backNode(): void {
    var element = $('.li-selectable.active')
    var time = 300;
    if (element.length==0) {
      element = $('.li-selectable.selected');
      time = 0;
    }
    returnItem(this.api,{"id":element[0].id}, this.tokenService, this.router).then(()=>{
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
            
            this.getListData();
          },300)
        },200)
      },500)
    },time)
    this.updatePoints()
     })
  }

  addNode(): void {
    $(".modal.add-modal").addClass('active');
  }

  editNode(): void {
    var data = {"id":$('.modal.edit-modal.active')[0].id,
    "points":$('.modal.edit-modal.active .price--value input').val(),
    "about":$('.modal.edit-modal.active .about--value').val(),
    "category":$('.modal.edit-modal.active').attr('category'),
    "name": $('.modal.edit-modal.active .title--value').val()};
    if (this.isParent) {
      editItem(this.api,data, this.tokenService, this.router).then(()=>{
        this.closeModal();
        this.getListData();
      });;
    }
  }

  closeModal(): void {
    var classs = ".modal"+".active";
    $(classs).removeClass('active');
    $(".good-li--shop-list.active").removeClass('active')
  }
  showModal(elementContent): void {
    var classs =""; 
    if(this.activeTab()=="inStock-modal" && this.isParent) {
      classs=".modal.edit-modal"
      $(classs).addClass('active');
    } else if(this.activeTab()=="bought-modal" && this.isParent) {
      classs = ".modal.received-modal";
      $(classs).addClass('active');
    } else {
      classs = ".modal."+this.activeTab();
      $(classs).addClass('active');
    }
    $(classs).attr("category",elementContent.category);
    $(classs).attr("name",elementContent.name);
    $(classs).attr("points",elementContent.points);
    $(classs).attr("id",elementContent.id);
    $(classs).attr("about",elementContent.about);
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

  categoryStr(numCategory) {
    if (numCategory==1) { return "Солодощі"}
    if (numCategory==2) { return "Іграшка"}
    if (numCategory==3) { return "Морозиво"}
    if (numCategory==4) { return "Книжка"}
    if (numCategory==5) { return "Фільм"}
    if (numCategory==6) { return "Квиток в кіно"}
    if (numCategory==7) { return "Комп'ютер"}
  }
 
}

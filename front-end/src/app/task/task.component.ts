import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import {translate} from '../services/StringResourses'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskAddComponent} from "../task-add/task-add.component"
import $ from 'node_modules/jquery'
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent;
  $=$

  constructor(private token :TokenService, private router: Router,private modalService: NgbModal) { 
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
      })
      this.isParent = jwt_decode(this.token.getAccess()).isParent;

    }
  }

  translate = translate
  
  ngOnInit(): void {
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.refreshTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
      })
    }

    $('.mat-typography').css("height","auto")
  }

  openModal() {
    const modalRef = this.modalService.open(TaskAddComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: true,
        backdrop: 'static',
        
        centered: true
      });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
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

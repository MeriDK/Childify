import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import {translate} from '../services/StringResourses'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  isParent = jwt_decode(this.token.getAccess()).isParent;

  constructor(private token :TokenService) { }

  translate = translate
  
  ngOnInit(): void {
    
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

import { Component, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.sass']
})
export class TaskInfoComponent implements AfterViewInit {
  isChild = false
  translate = translate

  ngAfterViewInit(): void {
    if(this.isChild) {
      $(".child-title").css("display", "none")
      $(".child-name").css("display", "none")
    }
    
  }
}

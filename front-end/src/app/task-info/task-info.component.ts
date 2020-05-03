import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.sass']
})
export class TaskInfoComponent implements AfterViewInit {
  isChild = true

  

  ngAfterViewInit(): void {
    if(this.isChild) {
      $(".child-title").css("display", "none")
      $(".child-name").css("display", "none")
    }
    
  }
}

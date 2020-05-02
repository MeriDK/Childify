import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'

@Component({
  selector: 'app-task-child',
  templateUrl: './task-child.component.html',
  styleUrls: ['./task-child.component.sass']
})
export class TaskChildComponent implements AfterViewInit {

  isChild = true
  constructor() { }
 
  ngAfterViewInit(): void {
    if (this.isChild){
      $(".task__child-name").css("display", "none")
      $(".child-tasks .fas").addClass('fa-check')
    }
    else{
      $(".child-tasks .fas").addClass('fa-times')
    }
  }
}


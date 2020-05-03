import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.sass']
})
export class TaskCheckComponent implements AfterViewInit {

  isChild = true
  constructor() { }
 
  ngAfterViewInit(): void {
    if (this.isChild){
      $(".task__child-name").css("display", "none")
      $(".check-tasks .check").css("display", "none")
      $(".check-tasks .fas").addClass('fa-chevron-left')
    }
    else{
      $(".check-tasks .task .cross .fas").addClass('fa-times')
    }
  }

  tasks = [
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4'
  ];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }


}

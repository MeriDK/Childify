import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-task-child',
  templateUrl: './task-child.component.html',
  styleUrls: ['./task-child.component.sass']
})
export class TaskChildComponent implements AfterViewInit {

  isChild = false
  translate = translate

  constructor() { }

 
  ngAfterViewInit(): void {
    if (this.isChild){
      $(".task__child-nam").css("display", "none")
      $(".child-tasks .fas").addClass('fa-check')
    }
    else{
      $(".child-tasks .fas").addClass('fa-times')
    }
  }

  tasks = [
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5',
    'Task 6',
    'Task 7'
  ];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}


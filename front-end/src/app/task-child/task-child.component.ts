import { Component, AfterViewInit} from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskChildService} from './task-child.service'

@Component({
  selector: 'app-task-child',
  templateUrl: './task-child.component.html',
  styleUrls: ['./task-child.component.sass'],
  providers: [TaskChildService]
})
export class TaskChildComponent implements AfterViewInit {

  isChild = false
  translate = translate
  url = 'task/info/'
  tasks = [{id: -1, name_task: 'test',point_task: 15,id_child:1}];
  constructor(private api: TaskChildService) {
    this.getTask();
  }
   getTask = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

 
  ngAfterViewInit(): void {
    if (this.isChild){
      $(".task__child-name").css("display", "none")
      $(".child-tasks .fas").addClass('fa-check')
    }
    else{
      $(".child-tasks .fas").addClass('fa-times')
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}


import { Component, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskCheckService} from './task-check.service'

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.sass'],
  providers: [TaskCheckService]
})
export class TaskCheckComponent implements AfterViewInit {

  isChild = true
  translate = translate
  url = "task/info/"
  tasks = [{id: -1 ,name_task: 'test',point_task: 15,id_child:1}];
  constructor(private api: TaskCheckService) {
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

  updateTasktoDone = (task) =>{
    this.api.updateTasktoDone(task).subscribe(
      data => {
        // @ts-ignore
        this.task=data
      },
      error => {
        console.log(error)
      }
    )
    this.getTask()
  }

  updateTasktoInProgress = (task) =>{
    this.api.updateTasktoInProgress(task).subscribe(
      data => {
        // @ts-ignore
        this.task=data
      },
      error => {
        console.log(error)
      }
    )
    this.getTask()
  }

 
  ngAfterViewInit(): void {
    if (this.isChild){
      $(".task__child-nam").css("display", "none")
      $(".check-tasks .check").css("display", "none")
      $(".check-tasks .task .cross ").css("display","none")
      $(".check-tasks .fas").addClass('fa-chevron-left')
    }
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }


}

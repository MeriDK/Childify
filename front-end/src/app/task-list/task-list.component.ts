import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskListService} from './task-list.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskListService]
})
export class TaskListComponent implements AfterViewInit,OnInit {
  isChild = true
  url

  translate = translate

  ngOnInit(): void {
    if (this.isChild) {
      this.url="task/info/"
    } else {
      this.url="task/change/"
    }
  }

  

  ngAfterViewInit(): void {

  }

  tasks = [{id:-1,name_task: 'test',point_task: 15}];


  constructor(private api: TaskListService, private router: ActivatedRoute){
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


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  

   
}


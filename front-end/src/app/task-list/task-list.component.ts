import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskListService} from './task-list.service'
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskInfoChangeComponent} from "../task-info-change/task-info-change.component"
import {TaskInfoComponent} from "../task-info/task-info.component"

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskListService]
})
export class TaskListComponent implements AfterViewInit,OnInit {
  isChild = !jwt_decode(this.token.getAccess()).isParent;
  task;
  url
  icon;
  model

  translate = translate

  ngOnInit(): void {
    if (this.isChild) {
      this.url="task/info/"
    } else {
      this.url="task/change/"
    }
  }

  openModal(task) {
    if(this.isChild){
      this.model = TaskInfoComponent
    }
    else{
      this.model = TaskInfoChangeComponent
    }
      
    const modalRef = this.modalService.open(this.model,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
        centered: true
      });

    let task_id = {
      id : task.id
    }
    console.log(task_id)
    modalRef.componentInstance.task_id = task_id;
    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    this.getTask()
  }

  

  ngAfterViewInit(): void {
    $('#tab1-link').on("click",() => {this.getTask()})
  }

  tasks = [{id:-1,category:"",name_task: 'test',point_task: 15}];


  constructor(private api: TaskListService, private router: ActivatedRoute,  private token :TokenService,private modalService: NgbModal){
    this.getTask();
    
  }

  category(category): void {
    if(category=="1"){
      this.icon = "../../assets/img/task-icon/House.png"
    }
    else if(category=="2"){
      this.icon = "../../assets/img/task-icon/Kitchen.png"
    }
    else if(category=="3"){
      this.icon = "../../assets/img/task-icon/Studding.png"
    }
    else if(category=="4"){
      this.icon = "../../assets/img/task-icon/Shop.png"
    }
    else if(category=="5"){
      this.icon = "../../assets/img/task-icon/Pets.png"
    }
  }

  getTask = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
        for (var i = 0; i<this.tasks.length; i++){
          this.category(this.tasks[i].category)
          this.tasks[i].category=this.icon
          console.log(this.tasks[i].category)
        }
        
      },
      error => {
        console.log(error)
      }
    )
    console.log(this.tasks)
    
  }

  updateTasktoInProgress = (task) =>{
    console.log(this.task)
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


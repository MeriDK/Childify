import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskListService} from './task-list.service'
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
import {TaskAddComponent} from "../task-add/task-add.component"

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
  isChild
  task;
  url
  icon;
  model

  translate = translate

  ngOnInit(): void {
    this.logOut()
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
        scrollable: false,
        windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
        centered: true
      });

    let task_id = {
      id : task.id
    }
    modalRef.componentInstance.task_id = task_id;
    modalRef.result.then((result) => {
      this.getTask()
    }, (reason) => {
    });
    this.getTask()
  }

  

  ngAfterViewInit(): void {
    $('#tab1-link').on("click",() => {
      this.getTask()

    })
    $('#btn-model-add').on("click",() => {
      this.openModalAdd()
    })
  }

  openModalAdd() {
    const modalRef = this.modalService.open(TaskAddComponent,
      {
        scrollable: false,
        windowClass: 'myCustomModalClass',
        keyboard: true,
        backdrop: 'static',
        
        centered: true
      });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      this.getTask();
    }, (reason) => {
    });
  }

  logOut(): void{
    this.token.refreshTokenSubs
    if (!this.token.getRefresh()){
      this.route.navigate(['../login'])
      return
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.route.navigate(['../login'])
        return
      })
    }
    this.isChild = !jwt_decode(this.token.getAccess()).isParent;
    
  }
  tasks = [{id:-1,category:"",name_task: 'test',point_task: 15}];


  constructor(private api: TaskListService, private route: Router, private router: ActivatedRoute,  private token :TokenService,private modalService: NgbModal, private routers: Router){
    if (!this.token.getRefresh()){
      this.route.navigate(['../login'])
      return
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.route.navigate(['../login'])
        return
      })
    }
    if (!this.token.getAccess()) {
      this.token.refreshTokenSubs().then(() => {
        token.logout();
        this.route.navigate(['/login']);
      },(err) => {
        this.route.navigate(['/login']);
      });
    }
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
        }
        
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


import { Component, AfterViewInit, AfterContentInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskCheckService} from './task-check.service'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskInfoComponent} from "../task-info/task-info.component"

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.sass'],
  providers: [TaskCheckService]
})
export class TaskCheckComponent implements AfterViewInit{

  picture = "../../assets/img/ava-icon/"
  
  ngAfterViewInit(): void{

    $('#tab3-link').on("click",() => {
      this.getTaskCheck()
      this.logOut()
    })
    console.log($('#tab3-link'))
    this.getTaskCheck()
  }

  logOut(): void{
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        console.log("token")
        this.router.navigate(['../login'])
      })
    }
  }

  isChild;
  translate = translate
  now = true
  url = "task/info/"
  icon;
  tasks = [{id: -1,category:"",name_task: 'test',point_task: 15,id_child:1,child_icon:""}];
  constructor(private api: TaskCheckService, private token :TokenService, private router: Router ,private modalService: NgbModal) {
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
      })
      this.isChild = !jwt_decode(this.token.getAccess()).isParent;

    }
    this.getTaskCheck();
  }

  openModal(task) {      
    const modalRef = this.modalService.open(TaskInfoComponent,
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
  }


  category(category): void {
    if(category==1){
      this.icon = "../../assets/img/task-icon/House.png"
    }
    else if(category==2){
      this.icon = "../../assets/img/task-icon/Kitchen.png"
    }
    else if(category==3){
      this.icon = "../../assets/img/task-icon/Studding.png"
    }
    else if(category==4){
      this.icon = "../../assets/img/task-icon/Shop.png"
    }
    else if(category==5){
      this.icon = "../../assets/img/task-icon/Pets.png"
    }
  }

  getTaskCheck = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
        console.log(this.tasks)
        for (var i = 0; i<this.tasks.length; i++){
          this.category(this.tasks[i].category)
          this.tasks[i].category=this.icon
          this.tasks[i].child_icon=this.picture+this.tasks[i].child_icon+".png"
        }
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
    this.api.addPoint(task).subscribe(
      data => {
        // @ts-ignore
      },
      error => {
        console.log(error)
      }
    )
    this.getTaskCheck()
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
    this.getTaskCheck()
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }


}

import { Component, AfterViewInit, AfterContentInit, OnInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskChildService} from './task-child.service'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {TaskInfoComponent} from "../task-info/task-info.component"
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-child',
  templateUrl: './task-child.component.html',
  styleUrls: ['./task-child.component.sass'],
  providers: [TaskChildService]
})
export class TaskChildComponent implements AfterViewInit{

  ngAfterViewInit(): void{
    console.log("Work)")
    $('#tab2-link').on("click",() => {
      this.getTask()
      this.logOut()
    })
  }

  logOut(): void{
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
      })
    }
  }

  isChild;
  translate = translate
  url = 'task/info/'
  picture = "../../assets/img/ava-icon/"
  end = ".png"
  icon;
  tasks = [{id: -1,category:"", name_task: 'test',point_task: 15,id_child:1,status:2, child_icon: ""}];
  constructor(private api: TaskChildService, private token :TokenService,private modalService: NgbModal, private router: Router) {
    if (!this.token.getRefresh()){
      this.router.navigate(['../login'])
    } else {
      this.token.verifyTokenSubs().catch(()=>{
        this.router.navigate(['../login'])
      })
      this.isChild = !jwt_decode(this.token.getAccess()).isParent;

    }
      this.getTask()
      
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

  getTask = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
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

  updateTasktoCheck = (task) =>{
    this.api.updateTasktoCheck(task).subscribe(
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

  updateTasktoTodo = (task) =>{
    this.api.updateTasktoTodo(task,null).subscribe(
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


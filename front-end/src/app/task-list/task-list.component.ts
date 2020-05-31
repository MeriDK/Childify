import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskListService} from './task-list.service'
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

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

  translate = translate

  ngOnInit(): void {
    if (this.isChild) {
      this.url="task/info/"
    } else {
      this.url="task/change/"
    }
  }

  

  ngAfterViewInit(): void {
    $('#tab1-link').on("click",() => {this.getTask()})
  }

  tasks = [{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15},{id:-1,id_category:"",name_task: 'test',point_task: 15}];


  constructor(private api: TaskListService, private router: ActivatedRoute,  private token :TokenService){
    this.getTask();
  }

  category(id_category): void {
    if(id_category==1){
      this.icon = "../../assets/img/task-icon/House.png"
    }
    else if(id_category==2){
      this.icon = "../../assets/img/task-icon/Kitchen.png"
    }
    else if(id_category==3){
      this.icon = "../../assets/img/task-icon/Studding.png"
    }
    else if(id_category==4){
      this.icon = "../../assets/img/task-icon/Shop.png"
    }
    else if(id_category==5){
      this.icon = "../../assets/img/task-icon/Pets.png"
    }
  }

  getTask = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
        for (var i = 0; i<this.tasks.length; i++){
          this.category(this.tasks[i].id_category)
          this.tasks[i].id_category=this.icon
          console.log(this.tasks[i].id_category)
        }
        
      },
      error => {
        console.log(error)
      }
    )
  }

  updateTasktoInProgress = (task) =>{
    this.api.updateTasktoInProgress(task,jwt_decode(this.token.getAccess()).user_id).subscribe(
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


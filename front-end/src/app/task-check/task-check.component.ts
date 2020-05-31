import { Component, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'
import {TaskCheckService} from './task-check.service'
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.sass'],
  providers: [TaskCheckService]
})
export class TaskCheckComponent implements AfterViewInit{

  ngAfterViewInit(): void{
    $('#tab3-link').on("click",() => {this.getTaskCheck()})
    console.log($('#tab3-link'))
    this.getTaskCheck()

  }

  isChild = !jwt_decode(this.token.getAccess()).isParent;
  translate = translate
  now = true
  url = "task/info/"
  icon;
  tasks = [{id: -1,id_category:"",name_task: 'test',point_task: 15,id_child:1}];
  constructor(private api: TaskCheckService, private token :TokenService) {
    this.getTaskCheck();
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

  getTaskCheck = () => {
    this.api.getTaskList().subscribe(
      data => {
        this.tasks = data;
        console.log(this.tasks)
        for (var i = 0; i<this.tasks.length; i++){
          this.category(this.tasks[i].id_category)
          this.tasks[i].id_category=this.icon
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

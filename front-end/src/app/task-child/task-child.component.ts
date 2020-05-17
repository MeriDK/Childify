import { Component, AfterViewInit } from '@angular/core';
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
export class TaskChildComponent {

  isChild = true
  translate = translate
  url = 'task/info/'
  icon;
  tasks = [{id: -1,id_category:"", name_task: 'test',point_task: 15,id_child:1,id_status:2}];
  constructor(private api: TaskChildService) {
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


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

}


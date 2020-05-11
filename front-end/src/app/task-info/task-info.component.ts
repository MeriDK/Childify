import { Component, AfterViewInit, OnInit } from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { ActivatedRoute } from '@angular/router';
import {TaskInfoServer} from './task-info.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.sass'],
  providers: [TaskInfoServer]
})
export class TaskInfoComponent{
  isChild = false
  translate = translate
  id_task;
  task;
  id_category;
  name_category;

  
  constructor(private route: ActivatedRoute, private api: TaskInfoServer) {
    this.id_task = this.route.snapshot.paramMap.get("id")
    this.getOneTask();
    this.task={id:-1,id_category:0 ,name_task: "",info_task:"" ,point_task:0,id_child:"name child"}
  }


  category(id_catagory): void {
    if(id_catagory==1){
      this.name_category="Home"
    }
    else if(id_catagory==2){
      this.name_category="Kitchen"
    }
    else if(id_catagory==3){
      this.name_category="Studing"
    }
    else if(id_catagory==4){
      this.name_category="Shop"
    }
    else if(id_catagory==5){
      this.name_category="Pet"
    }
  }


  getOneTask = () => {
    this.api.getTask(this.id_task).subscribe(
      data => {
        this.task=data
        this.id_category=data.id_category
        this.category(this.id_category)
      },
      error => {
        console.log(error)
      }
    )
  }
}

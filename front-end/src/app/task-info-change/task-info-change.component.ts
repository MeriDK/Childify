import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'
import { ActivatedRoute } from '@angular/router';
import {TaskInfoChangeServer} from './task-info-change.service'

@Component({
  selector: 'app-task-info-change',
  templateUrl: './task-info-change.component.html',
  styleUrls: ['./task-info-change.component.sass'],
  providers: [TaskInfoChangeServer]
  
})
export class TaskInfoChangeComponent implements OnInit {

  translate = translate
  id_task;
  task;
  category;
  
  
  constructor(private route: ActivatedRoute, private api: TaskInfoChangeServer) {
    this.id_task = this.route.snapshot.paramMap.get("id")
    this.task={id:-1, name_task: "",info_task:"" ,point_task:0}
    this.getOneTask();

    
  }

  ngOnInit(): void {
    console.log(this.task.category)
  }

  getOneTask = () => {
    this.api.getTask(this.id_task).subscribe(
      data => {
        this.task=data
        this.category=data.category
      },
      error => {
        console.log(error)
      }
    )
    console.log(this.task)
   
  }

  updateTask = () =>{
    this.api.updateTask(this.task,this.category).subscribe(
      data => {
        this.task=data
        this.category=data.id_category
      },
      error => {
        console.log(error)
      }
    )
  }

  filterChanged(selectedValue:string){
    this.category=selectedValue;
  }
}

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
 
  
  constructor(private route: ActivatedRoute, private api: TaskInfoChangeServer) {
    this.id_task = this.route.snapshot.paramMap.get("id")
    this.getOneTask();
    this.task={id:-1, name_task: "",info_task:"" ,point_task:0}
  }

  ngOnInit(): void {
  }

  getOneTask = () => {
    this.api.getTask(this.id_task).subscribe(
      data => {
        this.task=data
      },
      error => {
        console.log(error)
      }
    )
  }

  updateTask = () =>{
    this.api.updateTask(this.task).subscribe(
      data => {
        this.task=data
      },
      error => {
        console.log(error)
      }
    )
  }
}

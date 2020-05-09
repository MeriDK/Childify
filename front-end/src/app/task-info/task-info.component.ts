import { Component, AfterViewInit } from '@angular/core';
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
export class TaskInfoComponent implements AfterViewInit {
  isChild = false
  translate = translate
  id_task;
  task;

  ngAfterViewInit(): void {
    if(this.isChild) {
      $(".child-title").css("display", "none")
      $(".child-name").css("display", "none")
    }
    
  }
  
  constructor(private route: ActivatedRoute, private api: TaskInfoServer) {
    this.id_task = this.route.snapshot.paramMap.get("id")
    this.getOneTask();
    this.task={id:-1, name_task: "",info_task:"" ,point_task:0,id_child:"name child"}
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
}

import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'
import {TaskAddService} from './task-add.service'

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.sass'],
  providers: [TaskAddService]
})
export class TaskAddComponent implements OnInit {
  translate = translate
  task;
  constructor(private api: TaskAddService){
    this.task = [{name_task:'' ,info_task: '', point_task: 0}];
  }

  createTask = () => {
    this.api.createTask(this.task).subscribe(
      data => {
        // @ts-ignore
        this.task.push(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
  }

}

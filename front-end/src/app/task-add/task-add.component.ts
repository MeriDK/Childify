import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'
import {TaskAddService} from './task-add.service'
import { $ } from 'protractor';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.sass'],
  providers: [TaskAddService]
})
export class TaskAddComponent implements OnInit {
  translate = translate
  task;
  category;

  constructor(private api: TaskAddService){
    this.task = [{name_task:'' ,info_task: '', point_task: 0}];
  }

  createTask = () => {
    this.api.createTask(this.task,this.category).subscribe(
      data => {
        // @ts-ignore
        this.task.push(data,category);

      },
      error => {
        console.log(error);
      }
    )
    console.log(this.task);
    console.log(this.category)
  }
  ngOnInit(): void {
  }
  filterChanged(selectedValue:string){
    this.category=selectedValue;
  }

}

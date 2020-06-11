import { Component, OnInit,Input } from '@angular/core';
import {translate} from '../services/StringResourses'
import { ActivatedRoute } from '@angular/router';
import {TaskInfoChangeServer} from './task-info-change.service'

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-info-change',
  templateUrl: './task-info-change.component.html',
  styleUrls: ['./task-info-change.component.sass'],
  providers: [TaskInfoChangeServer]
  
})
export class TaskInfoChangeComponent implements OnInit {

  translate = translate
  task;
  category;
  @Input() task_id;
  
  
  constructor(private route: ActivatedRoute, private api: TaskInfoChangeServer,public activeModal: NgbActiveModal) {
    
    this.task={id:-1, name_task: "",info_task:"" ,point_task:0}
   

    
  }

  ngOnInit(): void {
    console.log(this.task.category)
    console.log(this.task_id)
    this.getOneTask();
  }

  getOneTask = () => {
    this.api.getTask(this.task_id.id).subscribe(
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
    this.closeModal()
  }

  filterChanged(selectedValue:string){
    this.category=selectedValue;
  }

  closeModal() {
    this.activeModal.close();
  }
}

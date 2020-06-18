import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import $ from 'node_modules/jquery'
import {translate} from '../services/StringResourses'
import { ActivatedRoute } from '@angular/router';
import {TaskInfoServer} from './task-info.service'
import { from } from 'rxjs';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.sass'],
  providers: [TaskInfoServer]
})
export class TaskInfoComponent implements OnInit {
  isChild = false
  translate = translate
  id_task;
  task;
  category;
  name_category;

  @Input() task_id;
  constructor(private route: ActivatedRoute, private api: TaskInfoServer,public activeModal: NgbActiveModal) {
    this.task={id:-1,category:0 ,name_task: "",info_task:"" ,point_task:0,id_child:"name child"}
  }

  ngOnInit(): void {
    this.getOneTask();
  }

  category_t(catagory): void {
    if(catagory==1){
      this.name_category="Home"
    }
    else if(catagory==2){
      this.name_category="Kitchen"
    }
    else if(catagory==3){
      this.name_category="Studing"
    }
    else if(catagory==4){
      this.name_category="Shop"
    }
    else if(catagory==5){
      this.name_category="Pet"
    }
  }


  getOneTask = () => {
    this.api.getTask(this.task_id.id).subscribe(
      data => {
        this.task=data
        this.category=data.category
        this.category_t(this.category)
      },
      error => {
        console.log(error)
      }
    )
  }
  closeModal() {
    this.activeModal.close();
  }
}

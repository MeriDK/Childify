import { Component, OnInit, Input } from '@angular/core';
import {translate} from '../services/StringResourses'
import {TaskAddService} from './task-add.service'
import { $ } from 'protractor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  @Input() fromParent;

  constructor(private api: TaskAddService, public activeModal: NgbActiveModal){
    this.task = [{name_task:'' ,info_task: '', point_task: 0}];
  }

  createTask = () => {
    this.api.createTask(this.task,this.category).subscribe(
      data => {
        // @ts-ignore

      },
      error => {
        console.log(error);
      }
    )
    this.activeModal.close();
  }
  ngOnInit(): void {
  }
  filterChanged(selectedValue:string){
    this.category=selectedValue;
  }
  closeModal() {
    this.activeModal.close(1);
  }

}

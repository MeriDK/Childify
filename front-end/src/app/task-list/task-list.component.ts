import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import $ from 'node_modules/jquery'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements AfterViewInit,OnInit {
  isChild = false
  url

  translate = translate

  ngOnInit(): void {
    if (this.isChild) {
      this.url="task/info"
    } else {
      this.url="task/change"
    }
  }

  ngAfterViewInit(): void {
    if(this.isChild) {
      $(".add-btn").css("display", "none")
      $(".tabset-task").addClass("tabset-task--without-btn")
      $("#tab2-link span")[0].innerHTML=translate('in_progress');
      $("#tab3-link span")[0].innerHTML=translate('done');
    }
  }

  tasks = [
    'Task 1',
    'Task 2',
    'Task 3',
    'Task 4',
    'Task 5',
    'Task 6',
    'Task 7',
    'Task 8',
    'Task 9'
  ];


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

   
}

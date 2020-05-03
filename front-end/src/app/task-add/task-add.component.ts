import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.sass']
})
export class TaskAddComponent implements OnInit {
  translate = translate
  
  constructor() { }

  ngOnInit(): void {
  }

}

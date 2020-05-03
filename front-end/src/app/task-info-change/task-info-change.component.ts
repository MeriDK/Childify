import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'

@Component({
  selector: 'app-task-info-change',
  templateUrl: './task-info-change.component.html',
  styleUrls: ['./task-info-change.component.sass']
})
export class TaskInfoChangeComponent implements OnInit {

  translate = translate
  
  constructor() { }

  ngOnInit(): void {
  }

}

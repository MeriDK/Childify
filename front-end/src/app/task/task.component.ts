import { Component, OnInit } from '@angular/core';
import {translate} from '../services/StringResourses'
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  translate = translate
  
  ngOnInit(): void {
    
  }
  
  
  

}

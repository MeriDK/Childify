import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskAddService {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  createTask(task,category): Observable<any> {
    const body = {id_category: category,name_task: task.name_task, about_task: task.about_task, point_task: task.point_task, id_family_task: 1};
    return this.http.post(this.baseUrl + "/family/1/task/create/" ,body, {headers: this.httpHeaders})
  }
}
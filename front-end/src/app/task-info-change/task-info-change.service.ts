import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from  '../../../../package.json'
@Injectable({
  providedIn: 'root'
})
export class TaskInfoChangeServer {


  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTask(id): Observable<any> {
    return this.http.get(config['baseURL'] + "/task/"+id+"/" , {headers: this.httpHeaders})
  }

  updateTask(task,category): Observable<any> {
    const body = {category: category,name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task, status: 1}
    return this.http.patch(config['baseURL'] + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
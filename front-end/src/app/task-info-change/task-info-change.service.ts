import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskInfoChangeServer {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTask(id): Observable<any> {
    return this.http.get(this.baseUrl + "/task/"+id+"/" , {headers: this.httpHeaders})
  }

  updateTask(task,category): Observable<any> {
    const body = {id_category: category,name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task}
    return this.http.put(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
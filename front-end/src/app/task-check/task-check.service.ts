import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCheckService {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<any> {
    return this.http.get(this.baseUrl + "/family/1/task/list?status=check" , {headers: this.httpHeaders})
  }

  updateTasktoDone(task): Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,id_status:4}
    return this.http.put(this.baseUrl + "/family/1/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }

  updateTasktoInProgress(task): Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,id_status:2}
    return this.http.put(this.baseUrl + "/family/1/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
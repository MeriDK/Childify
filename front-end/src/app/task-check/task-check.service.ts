import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskCheckService {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  getTaskList(): Observable<any> {
    return this.http.get(this.baseUrl + "/task/list?status=check" , {headers: this.httpHeaders})
  }

  updateTasktoDone(task): Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,id_status:4}
    return this.http.patch(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
  addPoint(task):Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,id_status:4}
    return this.http.patch(this.baseUrl + "/task/point/"+task.id  ,body,
    {headers: this.httpHeaders})
  }

  updateTasktoInProgress(task): Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,id_status:2}
    return this.http.put(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
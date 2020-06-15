import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import config from  '../../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class TaskCheckService {


  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient,private tokenService: TokenService) { }

  getTaskList(): Observable<any> {
    return this.http.get(config['baseURL'] + "/task/list?status=3" , {headers: this.httpHeaders})
  }

  updateTasktoDone(task): Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,status:5}
    return this.http.patch(config['baseURL'] + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
  addPoint(task):Observable<any> {
    const body = {name_task: task.name_task ,info_task: task.info_task ,point_task: task.point_task,status:5}
    return this.http.patch(config['baseURL'] + "/task/point/"+task.id  ,body,
    {headers: this.httpHeaders})
  }

  updateTasktoInProgress(task): Observable<any> {
    const body = {status:4}
    return this.http.patch(config['baseURL'] + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
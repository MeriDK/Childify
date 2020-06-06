import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import config from  '../../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class TaskAddService {


  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  createTask(task,category): Observable<any> {
    const body = {category: category,name_task: task.name_task, info_task: task.info_task, point_task: task.point_task, id_family: 1};
    return this.http.post(config['baseURL'] + "/task/create/" ,body, {headers: this.httpHeaders})
  }
}
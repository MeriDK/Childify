import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import config from  '../../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class TaskChildService {


  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTaskList(): Observable<any> {
    return this.http.get(config['baseURL'] + "/task/list?status=inProgress" , {headers: this.httpHeaders})
  }

  updateTasktoCheck(task): Observable<any> {
    const body = {status:3}
    return this.http.patch(config['baseURL'] + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
  updateTasktoTodo(task,id_child): Observable<any> {
    const body = {status:1,id_child: null}
    return this.http.patch(config['baseURL'] + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
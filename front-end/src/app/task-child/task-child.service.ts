import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskChildService {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTaskList(): Observable<any> {
    return this.http.get(this.baseUrl + "/task/list?status=inProgress" , {headers: this.httpHeaders})
  }

  updateTasktoCheck(task): Observable<any> {
    const body = {status:3}
    return this.http.patch(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
  updateTasktoTodo(task,id_child): Observable<any> {
    const body = {status:1,id_child: null}
    return this.http.patch(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
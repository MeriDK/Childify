import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTaskList(): Observable<any> {
    return this.http.get(this.baseUrl + "/task/list?status=todo" , {headers: this.httpHeaders})
  }

  updateTasktoInProgress(task,id_child): Observable<any> {
    console.log(id_child)
    const body = {status:2,id_child:id_child}
    return this.http.patch(this.baseUrl + "/task/"+task.id +"/" ,body,
    {headers: this.httpHeaders})
  }
}
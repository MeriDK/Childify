import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from  '../../../../package.json'
@Injectable({
  providedIn: 'root'
})
export class TaskInfoServer {

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTask(id): Observable<any> {
    return this.http.get(config['baseURL'] + "/task/"+id+"/" , {headers: this.httpHeaders})
  }

}
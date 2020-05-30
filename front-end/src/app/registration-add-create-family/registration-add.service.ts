import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationAddService {

  baseUrl = 'http://192.168.1.24:8000'

  httpHeaders = ()=>{return{ headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  


  createNewFamily(data): Observable<any> {
    const body = {name: data.name}
    const url = this.baseUrl + '/family/'
    return this.http.post(url, body, this.httpHeaders())
  }

  connectToFamily(data): Observable<any> {
    const body = {}
    const url = this.baseUrl + '/family/' + data.family_id + '/user/'
    return this.http.post(url, body, this.httpHeaders())
  }
}

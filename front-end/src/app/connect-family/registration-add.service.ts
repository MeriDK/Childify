import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import config from  '../../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class RegistrationAddService {


  httpHeaders = () => {
    return { headers : new HttpHeaders(
      {'Content-Type': 'application/json', Authorization: 'Bearer ' + this.tokenService.getAccess()}
    )};
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  createNewFamily(data): Observable<any> {
    const body = {username: data.username, password: data.password};
    const url = config['baseURL'] + '/family/';
    return this.http.post(url, body, this.httpHeaders());
  }

  connectToFamily(data): Observable<any> {
    const body = {username: data.username, password: data.password};
    const url = config['baseURL'] + '/family/' + data.family_id + '/user/';
    return this.http.patch(url, body, this.httpHeaders());
  }
}

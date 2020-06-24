import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../../../package.json';
import { TokenService } from '../token.service';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  id = this.getUserId();
  url = config.baseURL + '/user/' + this.id + '/settings';
  httpHeaders = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getAccess()
    })
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getUserId() {
    return jwt_decode(this.tokenService.getAccess()).user_id;
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.url, this.httpHeaders);
  }

  patchUserInfo(data): Observable<any> {
    return this.http.patch(this.url, data, this.httpHeaders);
  }

  deleteUserFamily(): Observable<any> {
    return this.http.delete(this.url, this.httpHeaders);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import config from  '../../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  httpHeaders = { headers : new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  registerNewUser(data): Observable<any> {
    const body = {email: data.email, password: data.password, isParent: data.isParent, numIcon: data.numIcon};
    const url = config['baseURL'] + '/user/';

    return this.http.post(url, body, this.httpHeaders);
  }

}

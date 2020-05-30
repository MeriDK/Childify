import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = 'http://192.168.1.24:8000';

  httpHeaders = { headers : new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  registerNewUser(data): Observable<any> {
    const body = {email: data.email, password: data.password, isParent: data.isParent, numIcon: data.numIcon};
    const url = this.baseUrl + '/user/';

    return this.http.post(url, body, this.httpHeaders);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = { headers : new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  registerNewUser(data): Observable<any> {
    const body = {username: data.username, email: data.email, password: data.password, isParent: data.isParent}
    const url = this.baseUrl + '/user/'

    return this.http.post(url, body, this.httpHeaders)
  }

}

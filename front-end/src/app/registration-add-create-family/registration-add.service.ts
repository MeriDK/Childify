import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationAddService {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = { headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.cookieService.get("accessToken")})}

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  


  createNewFamily(data): Observable<any> {
    const body = {name: data.name}
    const url = this.baseUrl + '/family/'
    return this.http.post(url, body, this.httpHeaders)
  }

  connectToFamily(data): Observable<any> {
    const body = {}
    const url = this.baseUrl + '/family/' + data.family_id + '/user/'
    return this.http.post(url, body, this.httpHeaders)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  baseUrl = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  refreshToken(): Observable<any> {
    const body = { "refresh": this.cookieService.get("refresh")}
    const url = this.baseUrl + '/login/refresh'

    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.post(url, body, httpHeadersWithToken)
  }

  refreshTokenSubs() : void {
    this.refreshToken().subscribe(
      data => {
        this.setCookie({"access":data.access, "refresh":data.refresh})
      },
      error => {
        console.log(error)
      }
    )
  }

  setCookie(data) : void {
    this.cookieService.set("access",data.access)
    if(data.refresh){
      this.cookieService.set("refresh",data.refresh)
    }
  }
}

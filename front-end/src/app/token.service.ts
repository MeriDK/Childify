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
    const body = { "refresh": this.cookieService.get("refreshToken")}
    const url = this.baseUrl + '/login/refresh'

    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json'})}
    return this.http.post(url, body, httpHeadersWithToken)
  }

  refreshTokenSubs() : void {
    this.refreshToken().subscribe(
      data => {
        this.setCookie({"accessToken":data.access, "refreshToken":data.refresh})
      },
      error => {
        console.log(error)
      }
    )
  }

  setCookie(data) : void {
    this.cookieService.set("accessToken",data.accessToken)
    if(data.refreshToken){
      this.cookieService.set("refreshToken",data.refreshToken)
    }
  }
}

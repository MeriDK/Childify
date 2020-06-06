import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode'
import config from  '../../../package.json'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPoints(): Observable<any> {
    const httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
    'Authorization':'Bearer '+ this.getAccess()})}}
    const url = config['baseURL'] + '/user/points/'
    return this.http.get(url, httpHeaders())
  }

  getPointsSubs() : any {
    return   new Promise((resolve, reject) => {
      this.getPoints().subscribe(
        data => { 
          resolve(data)
        },
        error => {
          console.log(error)
            console.log(error.error.code=="token_not_valid")
            if(error.error.code=="token_not_valid"){
              this.refreshTokenSubs().then( newToken => { this.getPoints().subscribe(data => {resolve(data)})})
            }
        }
      )
    }) 
}

  refreshToken(): Observable<any> {
    const body = { refresh: this.cookieService.get('refresh') };
    const url = config['baseURL'] + '/login/refresh/';

    const httpHeadersWithToken = { headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, body, httpHeadersWithToken);
  }

  refreshTokenSubs(): any {
    return new Promise((resolve) => {
      this.refreshToken().subscribe(
        data => {
          this.setCookie({access: data.access, refresh: data.refresh});
          resolve();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  setCookie(data): void {
    this.cookieService.set('access', data.access);
    if (data.refresh){
      this.cookieService.set('refresh', data.refresh);
    }
  }

  getAccess(): any {
    return this.cookieService.get('access');
  }
  getRefresh(): any {
    return this.cookieService.get('refresh');
  }
}

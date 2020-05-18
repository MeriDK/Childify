import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'http://127.0.0.1:8000'

  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg5NzQ4MDAyLCJqdGkiOiIzNDk1ZjI3NjFjMGU0ZTRkOWJjMDRiMjRmYmU5ZmNjNiIsInVzZXJfaWQiOjEsImlzUGFyZW50Ijp0cnVlfQ.zrzzXKfatl9zDVPQJcCIYwnWyHRW6Cr2UZl0LoOdfXo'/*+this.tokenService.getAccess()*/})}}

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getWishList(): Observable<any> {
    const url = this.baseUrl + '/prize/?family_id=1'

    return this.http.get(url, this.httpHeaders())
  }

  getWishListChild(): Observable<any> {
    const url = this.baseUrl + '/child_prize/?family_id=1'

    return this.http.get(url, this.httpHeaders())
  }

  addNewGood(data): Observable<any> {
    const body = {name: data.title, family_id: "1", points: data.price, about: data.about}
    const url = this.baseUrl + '/prize/'

    return this.http.post(url, body, this.httpHeaders())
  }

  addNewGoodChild(data): Observable<any> {
    const body = {name: data.title, family_id: "1", points: data.price, about: data.about}
    const url = this.baseUrl + '/child_prize/'

    return this.http.post(url, body, this.httpHeaders())
  }
}

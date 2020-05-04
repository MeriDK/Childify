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
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

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
    const body = {name: data.title, family_id: "1", points: data.price}
    const url = this.baseUrl + '/prize/'

    return this.http.post(url, body, this.httpHeaders())
  }

  addNewGoodChild(data): Observable<any> {
    const body = {name: data.title, family_id: "1", points: data.price}
    const url = this.baseUrl + '/child_prize/'

    return this.http.post(url, body, this.httpHeaders())
  }
}

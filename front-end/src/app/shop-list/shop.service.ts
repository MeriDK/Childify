import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';
import config from  '../../../../package.json'

@Injectable({
  providedIn: 'root'
})
export class ShopService {


  httpHeaders = ()=>{ return {headers : new HttpHeaders({'Content-Type': 'application/json',
  'Authorization':'Bearer '+ this.tokenService.getAccess()})}}

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getPoints(): Observable<any> {
    const url = config['baseURL'] + '/user/points'
    return this.http.get(url, this.httpHeaders())
  }

  getWishList(api): Observable<any> {
    const url = config['baseURL'] + '/item/?status=0'
    return api.http.get(url, api.httpHeaders())
  }

  getOrderList(api): Observable<any> {
    const url = config['baseURL'] + '/item/?status=1'
    return api.http.get(url, api.httpHeaders())
  }

  getReceivedList(api): Observable<any> {
    const url = config['baseURL'] + '/item/?status=2'
    return api.http.get(url, api.httpHeaders())
  }

  addItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'
    const body = {"points":data.points,"name":data.name,"about":data.about,"category":data.category}
    return api.http.post(url, body, api.httpHeaders())
  }

  buyItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'+data.id+'/receive/'
    const body = {}
    return api.http.patch(url, body, api.httpHeaders())
  }

  confirmItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'+data.id+'/confirm/'
    const body = {}
    return api.http.patch(url, body, api.httpHeaders())
  }
  returnItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'+data.id+'/return/'
    const body = {}
    return api.http.patch(url, body, api.httpHeaders())
  }

  editItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'+data.id+'/'
    console.log(data.name)
    const body = {"points":data.points,"name":data.name,"about":data.about,"category":data.category}
    return api.http.patch(url, body, api.httpHeaders())
  }

  deleteItem(api, data): Observable<any> {
    const url = config['baseURL'] + '/item/'+data.id+'/'
    return api.http.delete(url, api.httpHeaders())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import config from  '../../../../package.json'

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient
  ) {
  }
  loginUser(user) {
    return this.http.post(config['baseURL']+'/login/token/', user);
  }
  getFamily(headers) {
    return this.http.get(config['baseURL']+'/family/', headers);
  }
  validate(token) {
    return this.http.post(config['baseURL']+'/login/verify/', token);
  }
}

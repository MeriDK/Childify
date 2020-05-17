import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient
  ) {
  }
  loginUser(user) {
    return this.http.post('http://127.0.0.1:8000/login/token/', user);
  }
  getFamily(headers) {
    return this.http.get('http://127.0.0.1:8000/family/', headers);
  }
  validate(token) {
    return this.http.post('http://127.0.0.1:8000/login/verify/', token);
  }
}

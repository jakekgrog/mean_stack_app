import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  baseUrl = 'http://localhost:8888';

  constructor(
    private http: Http,
  ) { }

  registerUser(user) {
    return this.http.post(this.baseUrl + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.baseUrl + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.baseUrl + '/authentication/checkEmail/' + email).map(res => res.json());
  }

}
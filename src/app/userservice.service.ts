import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {e, p} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  uri = 'http://localhost:4000/user';

  constructor(private http: HttpClient) { }

  addUser(signUpDetails) {
    this.http.post(this.uri + '/new', signUpDetails)
      .subscribe(res => console.log('Done'));
  }

  userLogin(loginDetails) {
    this.http.post(this.uri + '/user/login', loginDetails)
      .subscribe(res => localStorage.setItem('User', JSON.stringify(res)));
  }

  designerLogin(loginDetails) {
    this.http.post(this.uri + '/designer/login', loginDetails)
      .subscribe(res => localStorage.setItem('User', JSON.stringify(res)));
  }
}

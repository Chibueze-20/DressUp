import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {Response} from './shared/Response';
import {T} from '@angular/core/src/render3';

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

  postData(url, payload) {
    return this.http.post(url, payload);
  }

}

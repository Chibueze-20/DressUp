import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  uri = 'http://localhost:4000/post';
  constructor(private http: HttpClient) { }

  Postpost(payload, url_path, param?) {
      if (param) {
          return this.http.post(this.uri + '/' + url_path + '/' + param, payload);
      }
      return this.http.post(this.uri + '/' + url_path, payload);
  }

  Getpost(param, url_path?) {
      if (url_path) {
          return this.http.get(this.uri + '/' + url_path + '/' + param);
      }
      return this.http.get(this.uri + '/' + param);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  uri = 'http://localhost:4000/post';
  constructor(private http: HttpClient) { }

  Postpost(payload: any, url_path: string) {

      return this.http.post(this.uri + '/' + url_path, payload);
  }

  PostpostParam(payload, url_path, param) {
      return this.http.post(this.uri + '/' + url_path + '/' + param, payload);
  }

  Getpost(param: string, url_path?: string) {
      if (url_path) {
          return this.http.get(this.uri + '/' + url_path + '/' + param);
      }
      return this.http.get(this.uri + '/' + param);
  }
}

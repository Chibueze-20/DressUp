import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewserviceService {

  constructor(private http: HttpClient) { }

  viewPost(id) {
    return this.http.get(
      'http://localhost:4000/post/view' + '/' + id);
  }

  viewBid(id) {
    return this.http.get('\'http://localhost:4000/request/view/' + id);
  }
}

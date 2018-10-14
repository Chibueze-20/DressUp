import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }

  postdata(url, payload){
    return this.http.post(url, payload);
  }

  getdata(url){
    return this.http.get(url);
  }
}

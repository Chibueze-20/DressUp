import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private uri = 'http//localhost:4000/bid';
  constructor(private http:HttpClient) { }

  placeBid(body:any){
    return this.http.post(this.uri+'/place',body)
  }
  acceptBid(id:any){
    return this.http.get(this.uri+'/accept/'+id)
  }

  acceptDirectBid(body:any){
    return this.http.post(this.uri+'/accept/direct',body)
  }

  rejectBid(id:any){
    return this.http.get(this.uri+'/reject/'+id)
  }
}

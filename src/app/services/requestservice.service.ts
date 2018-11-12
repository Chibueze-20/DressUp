import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class RequestserviceService {

    uri = 'http://localhost:4000/request';
    constructor(private http: HttpClient) { }

    PostOrder(payload, url_path, param?) {
        if (param) {
            return this.http.post(this.uri + '/' + url_path + '/' + param, payload);
        }
        return this.http.post(this.uri + '/' + url_path, payload);
    }

    GetOrder(param, url_path?) {
        if (url_path) {
            return this.http.get(this.uri + '/' + url_path + '/' + param);
        }
        return this.http.get(this.uri + '/' + param);
    }


}

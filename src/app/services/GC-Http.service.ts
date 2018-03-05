import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GCHTTPService {
    constructor(private _http: HttpClient) { }

    urlBase: String = 'http://localhost:59912/Api/';

    public Post(url: string, body: any): Observable<any> {
        return this._http.post(this.urlBase + url, body);
    }

    public Put(url: string, body: any): Observable<any> {
        return this._http.put(this.urlBase + url, body);
    }
}

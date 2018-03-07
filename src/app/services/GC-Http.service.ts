import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GCHTTPService {
    constructor(private _http: HttpClient) { }

    isWorking: EventEmitter<boolean> = new EventEmitter();

    urlBase: String = 'http://localhost:59912/Api/';

    public Post(url: string, body: any): Observable<any> {
        return Observable.create((obs) => {
            this.isWorking.emit(true);
            this._http.post(this.urlBase + url, body)
                .subscribe(
                    (obj) => {
                        obs.next(obj);
                    },
                    (erro) => {
                        obs.error(erro);
                    },
                    () => {
                        this.isWorking.emit(false);
                        obs.complete();
                    });

        });
    }

    public Put(url: string, body: any): Observable<any> {
        return this._http.put(this.urlBase + url, body);
    }
}

import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GCHTTPService {
    constructor(private _http: HttpClient) { }

    isWorking: EventEmitter<boolean> = new EventEmitter();

    urlBase: String = 'http://localhost:59912/Api/';

    private TrataUrl(url: string): string {

        if (url.indexOf('http') > -1) { return url; }
        return this.urlBase + url;
    }

    public Post(url: string, body: any): Observable<any> {
        return Observable.create((obs) => {
            this.isWorking.emit(true);
            this._http.post(this.TrataUrl(url), body)
                .subscribe(
                    (obj) => {
                        obs.next(obj);
                    },
                    (erro) => {
                        this.isWorking.emit(false);
                        obs.error(erro);
                    },
                    () => {
                        this.isWorking.emit(false);
                        obs.complete();
                    });

        });
    }

    // public Put(url: string, body: any): Observable<any> {
    //     return Observable.create((obs) => {
    //         this.isWorking.emit(true);
    //         this._http.put(this.TrataUrl(url), body)
    //             .subscribe(
    //                 (obj) => {
    //                     obs.next(obj);
    //                 },
    //                 (erro) => {
    //                     this.isWorking.emit(false);
    //                     obs.error(erro);
    //                 },
    //                 () => {
    //                     this.isWorking.emit(false);
    //                     obs.complete();
    //                 });

    //     });
    // }

    public Get(url: string): Observable<any> {
        return Observable.create((obs) => {
            this.isWorking.emit(true);
            this._http.get(this.TrataUrl(url))
                .subscribe(
                    (obj) => {
                        obs.next(obj);
                    },
                    (erro) => {
                        this.isWorking.emit(false);
                        obs.error(erro);
                    },
                    () => {
                        this.isWorking.emit(false);
                        obs.complete();
                    });

        });
    }
}

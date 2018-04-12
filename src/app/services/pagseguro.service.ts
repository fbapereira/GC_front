import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PagseguroService {

    constructor(private oHttpClient: HttpClient) { }

    public iniciaSessao(academia: Academia) {
        return this.oHttpClient.post('/ObtemSessao', academia);
    }

    public checkout(oMensalidade: Mensalidade, token: string, hash: string) {
        const obj: any = oMensalidade;
        obj.token = token;
        obj.senderHash = hash;
        return this.oHttpClient.post('/Checkout', obj);

    }
}

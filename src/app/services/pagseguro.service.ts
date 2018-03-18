import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GCHTTPService } from './GC-Http.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';

@Injectable()
export class PagseguroService {

    constructor(private GCHTTP: GCHTTPService) { }

    public iniciaSessao(academia: Academia) {
        return this.GCHTTP.Post('/ObtemSessao', academia);
    }

    public checkout(oMensalidade: Mensalidade, token: string, hash: string) {
        const obj: any = oMensalidade;
        obj.token = token;
        obj.senderHash = hash;
        return this.GCHTTP.Post('/Checkout', obj);

    }
}

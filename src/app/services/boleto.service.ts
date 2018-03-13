import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GCHTTPService } from './GC-Http.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';
import { PagamentoPagSeguro } from '../models/pagamento-pagseguro';

@Injectable()
export class BoletoService {

    oAcademia: Academia;
    constructor(private GCHTTP: GCHTTPService) { }


    public GetBoletos(oMensalidade: Mensalidade): Observable<PagamentoPagSeguro> {
        return this.GCHTTP.Post('ObtemPagseguro', oMensalidade);
    }

}

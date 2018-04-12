import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';
import { PagamentoPagSeguro } from '../models/pagamento-pagseguro';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoletoService {

  oAcademia: Academia;
  constructor(private oHttpClient: HttpClient) { }


  public GetBoletos(oMensalidade: Mensalidade): Observable<any> {
    return this.oHttpClient.post('ObtemPagseguro', oMensalidade);
  }

}

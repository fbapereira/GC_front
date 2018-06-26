import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Mensalidade } from "../models/mensalidade";
import { MensalidadeDetalhe } from "../models/mensalidade-detalhe";

@Injectable()
export class MensalidadeDetalheService {

  constructor(private oHttpClient: HttpClient) { }


  LoadMensalidadeStatus(oMensalidade: Mensalidade): Observable<any> {
    return this.oHttpClient.post('ObtemMensalidadeDetalhe', oMensalidade)
      .map((resp: any) => {
        const lstMensalidadeDetalhe = [];

        resp.forEach(element => {
          const oMensalidadeDetalhe: MensalidadeDetalhe = new MensalidadeDetalhe;
          oMensalidadeDetalhe.Id = element.Id;
          oMensalidadeDetalhe.LogDate = element.logDate;
          oMensalidadeDetalhe.Observacao = element.Observacao;
          lstMensalidadeDetalhe.push(oMensalidadeDetalhe);
        });

        return lstMensalidadeDetalhe;
      });
  }
}

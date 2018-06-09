import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Modalidade } from "../models/modalidade";
import { Academia } from "../models/academia";

@Injectable()
export class ModalidadeService {
  constructor(private oHttpClient: HttpClient) { }

  public Obtem(oAcademia: Academia): Observable<any> {
    return this.oHttpClient.post('ObtemModalidade', oAcademia);
  }

  public Altera(oModalidade: Modalidade): Observable<any> {
    return this.oHttpClient.put('GC_Modalidade/' + oModalidade.Id, oModalidade);
  }

  public Adiciona(oModalidade: Modalidade): Observable<any> {
    return this.oHttpClient.post('AdicionaModalidade', oModalidade);
  }

}


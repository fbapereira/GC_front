import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Modalidade } from "../models/modalidade";
import { Academia } from "../models/academia";
import { AcademiaService } from "./academia.service";

@Injectable()
export class ModalidadeService {
  constructor(private oHttpClient: HttpClient, private oAcademia: AcademiaService) { }

  public Obtem(oAcademia: Academia, loadActive?: boolean): Observable<any> {
    return this.oHttpClient.post('ObtemModalidade', oAcademia)
      .map((values: any[]) => {
        return values.filter((value) => {
          return value.IsActive || loadActive;
        });
      });
  }

  public Altera(oModalidade: Modalidade): Observable<any> {
    return this.oHttpClient.post('AlteraModalidade', oModalidade);
  }

  public Apagar(oModalidade: Modalidade): Observable<any> {
    return this.oHttpClient.post('DeletaModalidade', oModalidade);
  }

  public Adiciona(oModalidade: Modalidade): Observable<any> {
    oModalidade['GC_AcademiaId'] = this.oAcademia.oAcademia.Id;

    return this.oHttpClient.post('AdicionaModalidade', oModalidade);
  }

}


import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportService {
  constructor(private oHttpClient: HttpClient) { }


  public ObtemRelatorioMensal(mesAtual: number): Observable<any> {
    return this.oHttpClient.post('ObtemRelatorioMensal', { mes: mesAtual });
  }

}


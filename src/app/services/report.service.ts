import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { AcademiaService } from "./academia.service";

@Injectable()
export class ReportService {
  constructor(private oHttpClient: HttpClient, private oAcademiaService: AcademiaService) { }


  public ObtemRelatorioMensal(mesAtual: number): Observable<any> {
    return this.oHttpClient.post('ObtemRelatorioMensal', { mes: mesAtual, academia: this.oAcademiaService.oAcademia.Id });
  }

}


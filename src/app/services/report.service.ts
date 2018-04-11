import { Injectable } from "@angular/core";
import { GCHTTPService } from "./GC-Http.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ReportService {
  constructor(private GCHTTP: GCHTTPService) { }


  public ObtemRelatorioMensal(): Observable<any[]> {
    return this.GCHTTP.Post('ObtemRelatorioMensal', {});
  }

}


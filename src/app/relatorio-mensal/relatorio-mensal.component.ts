import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../shared/base-component";
import { ReportService } from "../services/report.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-gc-relatorio-mensal',
  templateUrl: './relatorio-mensal.component.html',
  styleUrls: ['./relatorio-mensal.component.css']
})
export class RelatorioMensalComponent extends BaseComponent implements OnInit {
  itensPagos: any[];
  itensAguardando: any[];
  itensSemBoleto: any[];
  itensAtrasados: any[];

  constructor(
    private oReportService: ReportService,
    oSAMService: SAMService,
    router: Router
  ) {
    super(true, oSAMService, router);
  }

  ngOnInit(): void {
    this.oReportService.ObtemRelatorioMensal()
      .subscribe((itens: any[]) => {
        this.itensPagos = itens.filter((x: any) => {
          return x.status === 'Paga';
        });
        this.itensAguardando = itens.filter((x: any) => {
          return moment(x.vencimento).isSameOrAfter(moment()) && x.status === 'Aguardando Pagamento';
        });
        this.itensSemBoleto = itens.filter((x: any) => {
          return !x.status;
        });

        this.itensAtrasados = itens.filter((x: any) => {
          return moment(x.vencimento).isBefore(moment()) && x.status === 'Aguardando Pagamento';
        });

        this.itensAtrasados.forEach((x) => { x.status = 'Atrasado' });
      });
  }
}


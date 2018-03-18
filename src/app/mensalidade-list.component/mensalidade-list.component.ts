import { Component, Input, OnInit, OnChanges, ViewChild } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from '../services/sam.service';
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";
import { Observable } from "rxjs/Observable";
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MessageUI } from "../models/messageUI";
import * as moment from 'moment';
import { AcademiaService } from "../services/academia.service";
import { PagamentoComponent } from "../pagamento.component/pagamento.component";
import { PagSeguroComponent } from "../pagseguro.component/pagseguro.component";

@Component({
    selector: 'app-gc-mensalidade-list',
    templateUrl: './mensalidade-list.component.html',
})

export class MensalidadeListComponent extends BaseComponent implements OnInit {

    @Input()
    targetUsuario: Usuario;

    @Input()
    showAdd: Boolean;

    @Input()
    showPay: Boolean;

    @Input()
    showPayAdmin: Boolean;


    @Input()
    showExclude: Boolean;

    @ViewChild("boleto") boleto: PagamentoComponent;
    @ViewChild("pagseguro") pagseguro: PagSeguroComponent;


    oRouter: any;
    lstMensalidade: Mensalidade[];
    targetNewMensalidade: Mensalidade;
    targetPagamentoMensalidade: Mensalidade;
    targetAlteraMensalidade: Mensalidade;

    messages: MessageUI[] = [];

    constructor(private oMensalidadeService: MensalidadeService,
        private oAcademiaService: AcademiaService,
        oSAMService: SAMService,
        router: Router
    ) {
        super(true, oSAMService, router);
        this.oRouter = router;
    }

    ngOnInit(): void {
        this.oMensalidadeService.GetMensalidade(this.targetUsuario)
            .subscribe((lstMensalidade: Mensalidade[]) => {
                this.lstMensalidade = lstMensalidade;
            });
    }


    NovoMensalidade(): void {
        this.targetNewMensalidade = new Mensalidade();
    }

    return(): void {
        this.targetNewMensalidade = undefined;
        this.targetPagamentoMensalidade = undefined;
        this.targetUsuario = undefined;
    }

    pagar(oMensalidade: Mensalidade): void {
        this.targetPagamentoMensalidade = oMensalidade;
    }

    alterar(oMensalidade: Mensalidade): void {
        this.targetAlteraMensalidade = oMensalidade;
    }

    apagar(oMensalidade: Mensalidade): void {
        this.oMensalidadeService.Deleta(oMensalidade)
            .subscribe(() => {
                this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                    .subscribe((lstMensalidade: Mensalidade[]) => {
                        this.lstMensalidade = lstMensalidade;
                    });
            });

    }

    CreateMensalidade(): void {
        const obs: Observable<Mensalidade>[] = [];
        const obsVinc: Observable<Mensalidade>[] = [];
        const lstMensalidade: Mensalidade[] = [];

        for (let _i = 0; _i < this.targetNewMensalidade.parcela; _i++) {
            lstMensalidade.push(this.targetNewMensalidade);
            obs.push(this.oMensalidadeService.Adiciona(
                Object.assign({}, this.targetNewMensalidade),
                this.oAcademiaService.oAcademia,
                this.targetUsuario));
            this.targetNewMensalidade.Vencimento = moment(this.targetNewMensalidade.Vencimento).add(1, 'M').toDate();
        }




        // Cria as mensalidades
        forkJoin(obs)
            .subscribe((oMensalidades: Mensalidade[]) => {
                // gera boleto 
                this.oMensalidadeService.GerarBoletos(oMensalidades).
                    subscribe(() => {

                    });
                // Vincula ao usuario
                oMensalidades.forEach((oMensalidade: Mensalidade) => {
                    obsVinc.push(this.oMensalidadeService.Vincula(oMensalidade, this.targetUsuario));
                });
                forkJoin(obsVinc).subscribe(() => {

                    // Obtem a mensalidade com Id
                    this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                        .subscribe((lstMensalidadeWithId: Mensalidade[]) => {



                            this.lstMensalidade = lstMensalidadeWithId;
                            const oMessageUI: MessageUI = new MessageUI();
                            this.messages = [];
                            oMessageUI.message = 'Mensalidades incluidas com sucesso';
                            oMessageUI.level = 'success';
                            oMessageUI.title = '[Mensalidades Incluídas]';
                            this.messages.push(oMessageUI);
                            this.targetNewMensalidade = undefined;
                            return;
                        });
                });
            });
    }

    payment(): void {
        this.pagseguro.getMethods();
    }
}

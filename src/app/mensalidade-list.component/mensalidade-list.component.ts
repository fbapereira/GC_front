import { Component, Input, OnInit, OnChanges, ViewChild, EventEmitter, SimpleChanges } from "@angular/core";
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
import { MensalidadeAlteraComponent } from "../mensalidade-altera.component/mensalidade-altera.component";

@Component({
    selector: 'app-gc-mensalidade-list',
    templateUrl: './mensalidade-list.component.html',
})

export class MensalidadeListComponent extends BaseComponent implements OnInit, OnChanges {

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
    @ViewChild("MensalidadeAltera") mensalidadeAltera: MensalidadeAlteraComponent;

    emitClose: EventEmitter<boolean> = new EventEmitter();

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
        this.messages = [];
        if (this.targetUsuario) {
            this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                .subscribe((lstMensalidade: Mensalidade[]) => {
                    this.lstMensalidade = lstMensalidade;
                });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.messages = [];
        if (this.targetUsuario) {
            this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                .subscribe((lstMensalidade: Mensalidade[]) => {
                    this.lstMensalidade = lstMensalidade;
                });
        }
    }


    NovoMensalidade(): void {
        this.messages = [];
        this.targetNewMensalidade = new Mensalidade();
    }

    return(parcialReturn: boolean): void {
        if (!parcialReturn) {
            this.emitClose.emit(true);
            this.targetUsuario = undefined;
        } else {

            this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                .subscribe((lstMensalidade: Mensalidade[]) => {
                    this.lstMensalidade = lstMensalidade;
                });
        }

        this.messages = [];
        this.targetNewMensalidade = undefined;
        this.targetPagamentoMensalidade = undefined;
        this.targetAlteraMensalidade = undefined;
        this.targetUsuario = undefined;


    }

    pagar(oMensalidade: Mensalidade): void {
        this.messages = [];
        this.targetPagamentoMensalidade = oMensalidade;
    }

    alterar(oMensalidade: Mensalidade): void {
        this.messages = [];
        this.targetAlteraMensalidade = oMensalidade;
    }

    apagar(oMensalidade: Mensalidade): void {
        this.messages = [];
        this.oMensalidadeService.Deleta(oMensalidade)
            .subscribe(() => {
                this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                    .subscribe((lstMensalidade: Mensalidade[]) => {
                        const oMessageUI: MessageUI = new MessageUI();
                        oMessageUI.message = 'Mensalidade apagada com sucesso';
                        oMessageUI.title = '[Mensalidade]';
                        oMessageUI.level = 'success';
                        this.messages.push(oMessageUI);
                        this.lstMensalidade = lstMensalidade;
                        return;
                    });
            });

    }

    CreateMensalidade(): void {
        const obs: Observable<Mensalidade>[] = [];
        const obsVinc: Observable<Mensalidade>[] = [];
        const lstMensalidade: Mensalidade[] = [];

        this.messages = [];
        // Validação
        if (!this.targetNewMensalidade.parcela || this.targetNewMensalidade.parcela === 0) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite a quantidade de parcelas';
            oMessageUI.title = '[Parcelas]';
            oMessageUI.level = 'danger';
            this.messages.push(oMessageUI);
            return;
        }

        if (!this.targetNewMensalidade.Valor || this.targetNewMensalidade.Valor <= 0) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, o valor da parcela deve ser maior que 0';
            oMessageUI.title = '[Valor]';
            oMessageUI.level = 'danger';
            this.messages.push(oMessageUI);
            return;
        }

        if (!this.targetNewMensalidade.Vencimento || moment(this.targetNewMensalidade.Vencimento).isBefore(moment())) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, a data deve ser maior que hoje';
            oMessageUI.title = '[Vencimento]';
            oMessageUI.level = 'danger';
            this.messages.push(oMessageUI);
            return;
        }


        if (!this.targetNewMensalidade.Vencimento ||
            moment(this.targetNewMensalidade.Vencimento).isAfter(moment().add(1, 'M').toDate())) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, a data deve ser em no maximo 30 dias';
            oMessageUI.title = '[Vencimento]';
            oMessageUI.level = 'danger';
            this.messages.push(oMessageUI);
            return;
        }




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

    AlterMensalidade(): void {

        this.oMensalidadeService
            .AlteraStatus(this.mensalidadeAltera.targetMensalidade.MensaliadadeStatus, this.mensalidadeAltera.targetMensalidade).
            subscribe(() => {
                this.return(true);
                const oMessageUI: MessageUI = new MessageUI();
                this.messages = [];
                oMessageUI.message = 'Mensalidade alterada com sucesso';
                oMessageUI.level = 'success';
                oMessageUI.title = '[Mensalidade Alterada]';
                this.messages.push(oMessageUI);
                this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                    .subscribe((lstMensalidade: Mensalidade[]) => {
                        this.lstMensalidade = lstMensalidade;
                    });
            });

    }
}

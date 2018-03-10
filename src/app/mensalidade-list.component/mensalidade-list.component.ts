import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";
import { Observable } from "rxjs/Observable";
import { forkJoin } from 'rxjs/observable/forkJoin';
import { MessageUI } from "../models/messageUI";
import * as moment from 'moment';

@Component({
    selector: 'app-gc-mensalidade-list',
    templateUrl: './mensalidade-list.component.html',
})

export class MensalidadeListComponent extends BaseComponent implements OnInit {

    @Input()
    targetUsuario: Usuario;

    lstMensalidade: Mensalidade[];
    targetNewMensalidade: Mensalidade;
    messages: MessageUI[] = [];

    constructor(private oMensalidadeService: MensalidadeService,
        oSAMService: SAMService,
        router: Router
    ) {
        super(true, oSAMService, router);
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
    }

    CreateMensalidade(): void {
        let obs: Observable<Mensalidade>[] = [];
        let obsVinc: Observable<Mensalidade>[] = [];

        for (var _i = 0; _i < this.targetNewMensalidade.parcela; _i++) {
            obs.push(this.oMensalidadeService.Adiciona(Object.assign({}, this.targetNewMensalidade)));
            this.targetNewMensalidade.Vencimento = moment(this.targetNewMensalidade.Vencimento).add(1, 'M').toDate();
        }

        forkJoin(obs)
            .subscribe((oMensalidades: Mensalidade[]) => {
                oMensalidades.forEach((oMensalidade: Mensalidade) => {
                    obsVinc.push(this.oMensalidadeService.Vincula(oMensalidade, this.targetUsuario));
                });
                forkJoin(obsVinc).subscribe(() => {
                    this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                        .subscribe((lstMensalidade: Mensalidade[]) => {
                            this.lstMensalidade = lstMensalidade;

                            const oMessageUI: MessageUI = new MessageUI();
                            this.messages = [];
                            oMessageUI.message = 'Mensalidades incluidas com sucesso';
                            oMessageUI.level = 'success';
                            oMessageUI.title = '[Mensalidades Incluídas]';
                            this.messages.push(oMessageUI);
                            return;
                        });
                });
            });


    }
}

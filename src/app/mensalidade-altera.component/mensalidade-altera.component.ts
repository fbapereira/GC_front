import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";
import { UsuarioService } from "../services/usuario.service";
import { MensalidadeStatus } from "../models/mensalidade-status";

@Component({
    selector: 'app-gc-altera-mensalidade',
    templateUrl: './mensalidade-altera.component.html',
})

export class MensalidadeAlteraComponent extends BaseComponent implements OnInit {

    @Input()
    targetMensalidade: Mensalidade;

    lstMensalidadeStatus: MensalidadeStatus[];

    constructor(private oMensalidadeService: MensalidadeService,
        oSAMService: SAMService,
        router: Router,
        private oUsuarioService: UsuarioService
    ) {
        super(true, oSAMService, router);

    }

    ngOnInit(): void {
        this.oMensalidadeService.LoadMensalidadeStatus()
            .subscribe((lstMensalidade: MensalidadeStatus[]) => {
                this.lstMensalidadeStatus = lstMensalidade;
            });
    }

}

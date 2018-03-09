import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";

@Component({
    selector: 'app-gc-mensalidade-list',
    templateUrl: './mensalidade-list.component.html',
})

export class MensalidadeListComponent extends BaseComponent implements OnInit {

    @Input()
    targetUsuario: Usuario;

    lstMensalidade: Mensalidade[];

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

}

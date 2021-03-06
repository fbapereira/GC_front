import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";
import { UsuarioService } from "../services/usuario.service";

@Component({
    selector: 'app-gc-mensalidade',
    templateUrl: './mensalidade.component.html',
})

export class MensalidadeComponent extends BaseComponent {
    @Input()
    showAdd: Boolean;
    
    constructor(private oMensalidadeService: MensalidadeService,
        oSAMService: SAMService,
        router: Router,
        private oUsuarioService: UsuarioService
    ) {
        super(true, oSAMService, router);
    }
}

import { Component, Input } from "@angular/core";
import { Mensalidade } from "../models/mensalidade";
import { BaseComponent } from "../shared/base-component";
import { UsuarioService } from "../services/usuario.service";
import { AcademiaService } from "../services/academia.service";
import { SAMService } from "../services/sam.service";
import { PerfilService } from "../services/perfil.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-gc-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: []
})

export class PagamentoComponent extends BaseComponent {
    @Input()
    targetMensalidade: Mensalidade;

    constructor(private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private oPerfilService: PerfilService,
        oSAMService: SAMService,
        router: Router) {
        super(true, oSAMService, router);
    }

    public copyToClipboard(): void {
        const inputElement = document.getElementById('txtBoleto');
        (<any>inputElement).select();
        document.execCommand('copy');
        inputElement.blur();
    }

}

import { Component, Input, OnInit } from "@angular/core";
import { Mensalidade } from "../models/mensalidade";
import { BaseComponent } from "../shared/base-component";
import { UsuarioService } from "../services/usuario.service";
import { AcademiaService } from "../services/academia.service";
import { SAMService } from "../services/sam.service";
import { PerfilService } from "../services/perfil.service";
import { Router } from "@angular/router";
import { BoletoService } from "../services/boleto.service";
import { PagamentoPagSeguro } from "../models/pagamento-pagseguro";

@Component({
    selector: 'app-gc-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: []
})

export class PagamentoComponent extends BaseComponent implements OnInit {

    @Input()
    targetMensalidade: Mensalidade;

    targetPagamentoPagSeguro: PagamentoPagSeguro;

    constructor(private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private oPerfilService: PerfilService,
        private oBoletoService: BoletoService,
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

    ngOnInit(): void {
        this.oBoletoService.GetBoletos(this.targetMensalidade)
            .subscribe((oPagamentoPagSeguro: PagamentoPagSeguro) => {
                this.targetPagamentoPagSeguro = oPagamentoPagSeguro;

                let code: string = this.targetPagamentoPagSeguro.BarCode;
                code = this.splice(code, 5, 0, '.');
                code = this.splice(code, 11, 0, ' ');
                code = this.splice(code, 17, 0, '.');
                code = this.splice(code, 24, 0, ' ');
                code = this.splice(code, 30, 0, '.');
                code = this.splice(code, 37, 0, ' ');
                code = this.splice(code, 39, 0, ' ');
                this.targetPagamentoPagSeguro.BarCode = code;

            });
    }




    print(): void {
        window.open(this.targetPagamentoPagSeguro.Link);
    }


    splice(st, idx, rem, str) {
        return st.slice(0, idx) + str + st.slice(idx + Math.abs(rem));
    };


}

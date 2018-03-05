import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDetailComponent } from '../usuario-detail.component/usuario-detail.component';
import { MessageUI } from '../models/messageUI';

@Component({
    selector: 'app-gc-meus-dados',
    templateUrl: './meus-dados.component.html',
    styleUrls: []
})


export class MeusDadosComponent {
    @ViewChild('usuarioDetail') usuarioDetail: UsuarioDetailComponent;
    messages: MessageUI[] = [];

    constructor(
        private oUsuarioService: UsuarioService,
        private router: Router) {

    }

    SetUsuario() {
        const oMessageUI: MessageUI = new MessageUI();
        this.messages = [];

        if (!this.usuarioDetail.targetUsuario.CPF) {
            oMessageUI.message = 'Por favor, digite um CPF valido';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Email) {
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[e-mail]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Login) {
            oMessageUI.message = 'Por favor, digite um Login valido';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Nome) {
            oMessageUI.message = 'Por favor, digite um Nome valido';
            oMessageUI.title = '[Nome]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Senha) {
            oMessageUI.message = 'Por favor, digite um Senha valido';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }

        if (this.messages.length === 0) {
            this.oUsuarioService.Altera(this.usuarioDetail.targetUsuario)
                .subscribe((isOK: boolean) => {
                    oMessageUI.message = 'Dados salvos com sucesso.';
                    oMessageUI.title = '[Dados Usuário]';
                    this.messages.push(oMessageUI);
                });
        }
    }
}

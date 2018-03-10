import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDetailComponent } from '../usuario-detail.component/usuario-detail.component';
import { MessageUI } from '../models/messageUI';
import { AcademiaService } from '../services/academia.service';
import { PerfilService } from '../services/perfil.service';
import { SAMService } from '../services/sam.service';
import { BaseComponent } from '../shared/base-component';

@Component({
    selector: 'app-gc-meus-dados',
    templateUrl: './meus-dados.component.html',
    styleUrls: []
})


export class MeusDadosComponent extends BaseComponent {
    @ViewChild('usuarioDetail') usuarioDetail: UsuarioDetailComponent;
    messages: MessageUI[] = [];

    constructor(private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private oPerfilService: PerfilService,
        oSAMService: SAMService,
        router: Router) {
        super(true, oSAMService, router);
    }

    SetUsuario() {
        this.messages = [];

        if (!this.usuarioDetail.targetUsuario.CPF) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um CPF valido';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
        }

        if (!this.validaEmail(this.usuarioDetail.targetUsuario.Email)) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[e-mail]';
            this.messages.push(oMessageUI);
        }
        if (!this.usuarioDetail.targetUsuario.Login) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Login valido';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Nome) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Nome valido';
            oMessageUI.title = '[Nome]';
            this.messages.push(oMessageUI);
        }

        if (!this.usuarioDetail.targetUsuario.Senha) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Senha valido';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }

        if (this.messages.length === 0) {
            this.oUsuarioService.Altera(this.usuarioDetail.targetUsuario)
                .subscribe((isOK: boolean) => {
                    const oMessageUI: MessageUI = new MessageUI();
                    oMessageUI.message = 'Dados salvos com sucesso.';
                    oMessageUI.title = '[Dados Usuário]';
                    oMessageUI.level = 'success';
                    this.messages.push(oMessageUI);
                }, (error: any) => {
                    if (error &&
                        error.error &&
                        error.error.Message) {
                        const oMessageUI: MessageUI = new MessageUI();
                        oMessageUI.message = error.error.Message;
                        oMessageUI.title = '[Dados Usuário]';
                        oMessageUI.level = 'danger';
                        this.messages.push(oMessageUI);
                    }
                });
        }
    }
}

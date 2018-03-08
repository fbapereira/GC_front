
import { OnInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../services/perfil.service';

@Component({
    selector: 'app-gc-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: []
})

export class UsuarioListComponent implements OnInit {
    @Input()
    targetAcademia: Academia;

    lstUsuario: Usuario[] = [];
    @ViewChild('content') content: ElementRef;

    targetUsuario: Usuario;
    messages: MessageUI[] = [];

    constructor(private oUsuarioService: UsuarioService,
        private oPerfilService: PerfilService, ) {

    }

    ngOnInit(): void {

        this.loadUsuario();
    }

    loadUsuario(): void {
        if (this.targetAcademia) {
            this.oUsuarioService.Obtem(this.targetAcademia)
                .subscribe((lstUsuario: Usuario[]) => {
                    this.lstUsuario = lstUsuario;
                });
        }
    }

    viewDetail(oUsuario: Usuario): void {
        this.targetUsuario = oUsuario;
    }

    return(): void {
        this.targetUsuario = undefined;
    }

    isAdmin(): boolean {
        return this.oPerfilService.isAdmin(this.oPerfilService.oPerfil);
    }

    SetUsuario() {
        const oMessageUI: MessageUI = new MessageUI();
        this.messages = [];

        if (!this.targetUsuario.CPF) {
            oMessageUI.message = 'Por favor, digite um CPF valido';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Email) {
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[e-mail]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Login) {
            oMessageUI.message = 'Por favor, digite um Login valido';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Nome) {
            oMessageUI.message = 'Por favor, digite um Nome valido';
            oMessageUI.title = '[Nome]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Senha) {
            oMessageUI.message = 'Por favor, digite um Senha valido';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }

        if (this.messages.length === 0) {
            this.oUsuarioService.Altera(this.targetUsuario)
                .subscribe((isOK: boolean) => {
                    oMessageUI.message = 'Dados salvos com sucesso.';
                    oMessageUI.title = '[Dados Usuário]';
                    oMessageUI.level = 'success';
                    this.messages.push(oMessageUI);
                    this.targetUsuario = undefined;
                    this.loadUsuario();
                }, (error: any) => {
                    if (error &&
                        error.error &&
                        error.error.Message) {
                        oMessageUI.message = error.error.Message;
                        oMessageUI.title = '[Dados Usuário]';
                        oMessageUI.level = 'danger';
                        this.messages.push(oMessageUI);
                    }
                });
        }
    }
}


import { OnInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../services/perfil.service';
import { AcademiaService } from '../services/academia.service';
import { BaseComponent } from '../shared/base-component';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gc-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: []
})

export class UsuarioListComponent extends BaseComponent implements OnInit {
    @Input()
    targetAcademia: Academia;

    lstUsuario: Usuario[] = [];
    @ViewChild('content') content: ElementRef;

    targetUsuarioMensalidade: Usuario;
    targetUsuario: Usuario;
    targetNewUsuario: Usuario;
    meuUsuario: Usuario;
    messages: MessageUI[] = [];

    constructor(private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private oPerfilService: PerfilService,
        oSAMService: SAMService,
        router: Router) {
        super(true, oSAMService, router);
        this.meuUsuario = oUsuarioService.oUsuario;
    }

    ngOnInit(): void {

        this.loadUsuario();
    }

    loadUsuario(): void {
        if (this.targetAcademia) {
            this.oUsuarioService.Obtem(this.targetAcademia)
                .subscribe((lstUsuario: Usuario[]) => {

                    lstUsuario = lstUsuario.sort((a: Usuario, b: Usuario) => {
                        if (a.Nome < b.Nome) return -1;
                        if (a.Nome > b.Nome) return 1;
                        return 0;
                    });
                    this.lstUsuario = lstUsuario;
                });
        }
    }

    viewDetail(oUsuario: Usuario): void {
        this.targetUsuario = oUsuario;
    }

    viewMensalidade(oUsuario: Usuario): void {
        this.targetUsuarioMensalidade = oUsuario;
    }

    apagar(oUsuario: Usuario): void {
        this.oUsuarioService.Deleta(oUsuario).subscribe(() => {
            this.loadUsuario();
        });
    }


    return(): void {
        this.targetUsuario = undefined;
        this.targetNewUsuario = undefined;
        this.loadUsuario();
    }

    isAdmin(): boolean {
        return this.oPerfilService.isAdmin(this.oPerfilService.oPerfil);
    }
    CreateUsuario() {
        this.messages = [];

        if (!this.targetNewUsuario.CPF) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um CPF valido';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
        }

        if (!this.validaEmail(this.targetNewUsuario.Email)) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[e-mail]';
            this.messages.push(oMessageUI);
        }


        if (!this.targetNewUsuario.Login) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Login valido';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (this.targetNewUsuario.Login.indexOf(' ') > -1) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Login não deve conter espaço.';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetNewUsuario.Nome) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Nome valido';
            oMessageUI.title = '[Nome]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetNewUsuario.Senha) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Senha valido';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }



        if (this.messages.length === 0) {
            this.oUsuarioService.Adiciona(this.targetNewUsuario)
                .subscribe((newUser: Usuario) => {
                    const oMessageUI: MessageUI = new MessageUI();
                    oMessageUI.message = 'Dados salvos com sucesso.';
                    oMessageUI.title = '[Dados Usuário]';
                    oMessageUI.level = 'success';
                    this.messages.push(oMessageUI);
                    this.targetNewUsuario = undefined;
                    this.oAcademiaService.AdicionaUsuario(newUser, this.oAcademiaService.oAcademia)
                        .subscribe(() => {
                            this.loadUsuario();
                        });
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

    NovoUsuario() {
        this.targetNewUsuario = new Usuario();
    }

    showMensalidade(show: boolean): boolean {
        return show;
    }
    SetUsuario() {
        this.messages = [];

        if (!this.targetUsuario.CPF) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um CPF valido';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
        }



        if (!this.validaEmail(this.targetUsuario.Email)) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[e-mail]';
            this.messages.push(oMessageUI);
        }


        if (!this.targetUsuario.Login) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Login valido';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (this.targetUsuario.Login.indexOf(' ') > -1) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Login não deve conter espaço.';
            oMessageUI.title = '[Login]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Nome) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Nome valido';
            oMessageUI.title = '[Nome]';
            this.messages.push(oMessageUI);
        }

        if (!this.targetUsuario.Senha) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um Senha valido';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }

        if (this.messages.length === 0) {
            this.oUsuarioService.Altera(this.targetUsuario)
                .subscribe((isOK: boolean) => {
                    const oMessageUI: MessageUI = new MessageUI();
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

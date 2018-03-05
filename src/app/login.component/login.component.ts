import { OnInit, Component } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { Academia } from '../models/academia';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    messages: MessageUI[] = [];
    oUsuario: Usuario = new Usuario();
    lstAcademia: Academia[] = [];

    oAcademia: Academia;

    constructor(
        private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private router: Router) {

    }

    SetAcademia(oAcademia: Academia) {
        this.messages = [];

        if (!oAcademia || oAcademia.id === 0) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, selecione uma academia';
            oMessageUI.title = '[Academia]';
            this.messages.push(oMessageUI);
            return;
        }

        this.oAcademiaService.oAcademia = oAcademia;
        this.router.navigate(['/dashboard']);
    }

    ForgetPassword() {
        this.router.navigate(['/forget-password']);
    }

    Login(oUsuario: Usuario) {
        this.messages = [];

        if (!this.oUsuario.Email) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite um e-mail valido';
            oMessageUI.title = '[E-mail]';
            this.messages.push(oMessageUI);

        }

        if (!this.oUsuario.Senha) {
            const oMessageUI: MessageUI = new MessageUI();
            oMessageUI.message = 'Por favor, digite sua senha';
            oMessageUI.title = '[Senha]';
            this.messages.push(oMessageUI);
        }

        if (this.messages.length === 0) {
            this.oUsuarioService.Login(this.oUsuario)
                .subscribe((x: boolean) => {
                    if (!x) {
                        const oMessageUI: MessageUI = new MessageUI();
                        oMessageUI.message = 'Senha ou Usuário inválidos';
                        oMessageUI.title = '[Dados Inválidos]';
                        this.messages.push(oMessageUI);
                        return;
                    }

                    // Obtem Instituicao
                    this.oAcademiaService.GetAcademia(this.oUsuarioService.oUsuario)
                        .subscribe((lstAcademia: Academia[]) => {
                            if (!lstAcademia || lstAcademia.length === 0) {
                                const oMessageUI: MessageUI = new MessageUI();
                                oMessageUI.message = 'Por favor, entre em contato com o administrador';
                                oMessageUI.title = '[Usuário sem Academia]';
                                this.messages.push(oMessageUI);
                                return;
                            } else if (lstAcademia.length === 1) {
                                this.SetAcademia(lstAcademia[0]);
                                this.router.navigate(['/dashboard']);
                                return;
                            }
                            this.lstAcademia = lstAcademia;
                        });
                });
        }
    }
}

import { OnInit, Component } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { Academia } from '../models/academia';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent {
    messages: MessageUI[] = [];
    oUsuario: Usuario = new Usuario();

    constructor(
        private oUsuarioService: UsuarioService,
        private router: Router) {

    }

    SendPassword() {
        const oMessageUI: MessageUI = new MessageUI();
        this.messages = [];
        if (!this.oUsuario || this.oUsuario.CPF === '') {
            oMessageUI.message = 'Por favor, Digite seu CPF';
            oMessageUI.title = '[CPF]';
            this.messages.push(oMessageUI);
            return;
        }

        this.oUsuarioService.RecuperaSenha(this.oUsuario)
            .subscribe((isOK: boolean) => {
                if (isOK) {
                    oMessageUI.message = 'Encaminhamos ao seu e-mail sua nova senha';
                    oMessageUI.title = '[Nova Senha]';
                    oMessageUI.level = 'success';
                    this.messages.push(oMessageUI);
                    return;
                } else {
                    oMessageUI.message = 'Houve um erro ao resetar sua senha';
                    oMessageUI.title = '[Nova Senha]';
                    oMessageUI.level = 'danger';
                    this.messages.push(oMessageUI);
                    return;
                }
            }, (e) => {
                oMessageUI.message = 'Houve um erro ao resetar sua senha';
                oMessageUI.title = '[Nova Senha]';
                oMessageUI.level = 'danger';
                this.messages.push(oMessageUI);
                return;
            });
    }


    ReturnLogin() {
        this.router.navigate(['login']);
    }
}

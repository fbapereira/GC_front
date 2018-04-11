import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDetailComponent } from '../usuario-detail.component/usuario-detail.component';
import { AcademiaService } from '../services/academia.service';
import { PerfilService } from '../services/perfil.service';
import { SAMService } from '../services/sam.service';
import { BaseComponent } from '../shared/base-component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gc-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: []
})


export class MeusDadosComponent extends BaseComponent {
  @ViewChild('usuarioDetail') usuarioDetail: UsuarioDetailComponent;

  constructor(
    private toastr: ToastrService,
    private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    private oPerfilService: PerfilService,
    oSAMService: SAMService,
    router: Router) {
    super(true, oSAMService, router);
  }

  SetUsuario() {

    if (!this.usuarioDetail.targetUsuario.CPF) {

      this.toastr.info('Por favor, digite um CPF valido', '[CPF]');
      return;
    }

    if (!this.validaEmail(this.usuarioDetail.targetUsuario.Email)) {
      this.toastr.info('Por favor, digite um e-mail valido', '[e-mail]');
      return;
    }

    if (!this.usuarioDetail.targetUsuario.Login) {
      this.toastr.info('Por favor, digite um Login valido', '[Login]');
      return;
    }

    if (!this.usuarioDetail.targetUsuario.Nome) {
      this.toastr.info('Por favor, digite um Nome valido', '[Nome]');
      return;
    }

    if (!this.usuarioDetail.targetUsuario.Senha) {
      this.toastr.info('Por favor, digite um Senha valido', '[Senha]');
      return;
    }

    this.oUsuarioService.Altera(this.usuarioDetail.targetUsuario)
      .subscribe((isOK: boolean) => {
        this.toastr.success('Dados salvos com sucesso', '[Dados Usuário]');
      }, (error: any) => {
        if (error &&
          error.error &&
          error.error.Message) {
          this.toastr.error(error.error.Message, '[Dados Usuário]');
          return;
        }
      });

  }
}

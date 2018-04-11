
import { OnInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../services/perfil.service';
import { AcademiaService } from '../services/academia.service';
import { BaseComponent } from '../shared/base-component';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';
import { MensalidadeListComponent } from '../mensalidade-list.component/mensalidade-list.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gc-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: []
})

export class UsuarioListComponent extends BaseComponent implements OnInit {
  @Input()
  targetAcademia: Academia;
  sBusca: string;
  lstUsuarioFiltered: Usuario[] = [];
  lstUsuario: Usuario[] = [];
  @ViewChild('content') content: ElementRef;



  @ViewChild('MensalidadeList') MensalidadeList: MensalidadeListComponent;


  targetUsuarioMensalidade: Usuario;
  targetUsuario: Usuario;
  targetNewUsuario: Usuario;
  meuUsuario: Usuario;

  constructor(private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    private oPerfilService: PerfilService,
    oSAMService: SAMService,
    private toastr: ToastrService,
    router: Router) {
    super(true, oSAMService, router);
    this.meuUsuario = oUsuarioService.oUsuario;

  }

  ngOnInit(): void {

    this.loadUsuario();
    this.MensalidadeList.emitClose.subscribe((s: boolean) => {
      this.targetUsuarioMensalidade = undefined;
    });

  }

  search(): void {

    if (!this.sBusca ||
      this.sBusca.length === 0) {
      this.lstUsuarioFiltered = this.lstUsuario;
      return;
    }

    this.lstUsuarioFiltered = this.lstUsuario.filter((x: Usuario) => {
      if (x.CPF.indexOf(this.sBusca) > -1) { return true; }
      if (x.Email.toUpperCase().indexOf(this.sBusca.toUpperCase()) > -1) { return true; }
      if (x.Nome.toUpperCase().indexOf(this.sBusca.toUpperCase()) > -1) { return true; }
      return false;
    });


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
          this.lstUsuarioFiltered = lstUsuario;
          this.search();
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

    if (!this.targetNewUsuario.CPF) {
      this.toastr.info('Por favor, digite um CPF valido', '[CPF]');
      return;
    }

    if (!this.validaEmail(this.targetNewUsuario.Email)) {
      this.toastr.info('Por favor, digite um e-mail valido', '[e-mail]');
      return;

    }


    if (!this.targetNewUsuario.Login) {
      this.toastr.info('Por favor, digite um Login valido', '[Login]');
      return;
    }

    if (this.targetNewUsuario.Login.indexOf(' ') > -1) {
      this.toastr.info('Por favor, digite um Login valido', '[Login]');
      return;
    }

    if (!this.targetNewUsuario.Nome) {
      this.toastr.info('Por favor, digite um Nome valido', '[Nome]');
      return;
    }

    if (!this.targetNewUsuario.Senha) {
      this.toastr.info('Por favor, digite um Senha valido', '[Senha]');
      return;
    }



    this.oUsuarioService.Adiciona(this.targetNewUsuario)
      .subscribe((newUser: Usuario) => {
        this.toastr.success('Dados salvos com sucesso.', '[Dados Usuário]');
        this.oAcademiaService.AdicionaUsuario(newUser, this.oAcademiaService.oAcademia)
          .subscribe(() => {
            this.loadUsuario();
          });
      }, (error: any) => {
        if (error &&
          error.error &&
          error.error.Message) {
          this.toastr.error(error.error.Message, '[Dados Usuário]');
        }
      });
  }


  NovoUsuario() {
    this.targetNewUsuario = new Usuario();
  }

  showMensalidade(show: boolean): boolean {
    return show;
  }
  SetUsuario() {

    if (!this.targetUsuario.CPF) {
      this.toastr.info('Por favor, digite um CPF valido', '[CPF]');
      return;
    }



    if (!this.validaEmail(this.targetUsuario.Email)) {
      this.toastr.info('Por favor, digite um e-mail valido', '[e-mail]');
      return;
    }


    if (!this.targetUsuario.Login) {
      this.toastr.info('Por favor, digite um Login valido', '[Login]');
      return;
    }

    if (this.targetUsuario.Login.indexOf(' ') > -1) {
      this.toastr.info('Por favor, digite um Login valido', '[Login]');
      return;
    }

    if (!this.targetUsuario.Nome) {
      this.toastr.info('Por favor, digite um Nome valido', '[Nome]');
      return;
    }

    if (!this.targetUsuario.Senha) {
      this.toastr.info('Por favor, digite um Senha valido', '[Senha]');
      return;
    }

    this.oUsuarioService.Altera(this.targetUsuario)
      .subscribe((isOK: boolean) => {
        this.toastr.success('Dados salvos com sucesso.', '[Dados Usuário]');
        this.targetUsuario = undefined;
        this.loadUsuario();
      }, (error: any) => {
        if (error &&
          error.error &&
          error.error.Message) {
          this.toastr.error(error.error.Message, '[Dados Usuário]');
        }
      });
  }
}

import { OnInit, Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { Academia } from '../models/academia';
import { Router } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { GCHTTPService } from '../services/GC-Http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  oUsuario: Usuario = new Usuario();
  lstAcademia: Academia[] = [];

  oAcademia: Academia;

  constructor(
    private toastr: ToastrService,
    private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    private oPerfilService: PerfilService,
    private GCHTTP: GCHTTPService,
    private router: Router) {

  }

  SetAcademia(oAcademia: Academia) {

    if (!oAcademia || oAcademia.Id === 0) {
      this.toastr.info('Por favor, selecione uma academia', '[Academia]');
      return;
    }

    this.oAcademiaService.oAcademia = oAcademia;
    this.oAcademia = oAcademia;
    this.oPerfilService.GetPerfil(this.oUsuarioService.oUsuario, oAcademia)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
        return;
      });
  }

  ForgetPassword() {
    this.router.navigate(['/forget-password']);
  }

  Login(oUsuario: Usuario) {

    if (!this.oUsuario.Email) {
      this.toastr.error('Por favor, digite um e-mail valido', '[E-mail]');
      return;
    }

    if (!this.oUsuario.Senha) {
      this.toastr.error('Por favor, digite sua senha', '[Senha]');
      return;
    }

    this.oUsuarioService.Login(this.oUsuario)
      .subscribe((x: boolean) => {
        if (!x) {
          this.toastr.error('Senha ou Usuário inválidos', '[Dados Inválidos]');
          return;
        }

        // Obtem Instituicao
        this.oAcademiaService.GetAcademia(this.oUsuarioService.oUsuario)
          .subscribe((lstAcademia: Academia[]) => {
            if (!lstAcademia || lstAcademia.length === 0) {
              this.toastr.error('Por favor, entre em contato com o administrador', '[Usuário sem Academia]');
              return;
            } else if (lstAcademia.length === 1) {
              this.SetAcademia(lstAcademia[0]);
              this.oPerfilService.GetPerfil(this.oUsuarioService.oUsuario, this.oAcademia)
                .subscribe(() => {
                  this.router.navigate(['/dashboard']);
                  return;
                });
            }
            this.lstAcademia = lstAcademia;
          });
      });

  }
}

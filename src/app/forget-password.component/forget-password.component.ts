import { OnInit, Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { Academia } from '../models/academia';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent {
  oUsuario: Usuario = new Usuario();

  constructor(
    private toastr: ToastrService,
    private oUsuarioService: UsuarioService,
    private router: Router) {

  }

  SendPassword() {
    if (!this.oUsuario || this.oUsuario.CPF === '') {
      this.toastr.error('Por favor, Digite seu CPF', 'CPF');
      return;
    }

    this.oUsuarioService.RecuperaSenha(this.oUsuario)
      .subscribe((isOK: boolean) => {
        if (isOK) {

          this.toastr.success('Encaminhamos ao seu e-mail sua nova senha', 'Nova Senha');
          return;
        } else {
          this.toastr.error('Houve um erro ao resetar sua senha', 'Nova Senha');
          return;
        }
      }, (e) => {
        this.toastr.error('Houve um erro ao resetar sua senha', 'Nova Senha');
        return;
      });
  }


  ReturnLogin() {
    this.router.navigate(['login']);
  }
}

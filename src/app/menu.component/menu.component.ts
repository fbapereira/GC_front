import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { PerfilService } from '../services/perfil.service';
import { OnInit, Component, ViewChild, style } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';


@Component({
  selector: 'app-gc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  constructor(
    private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    private oPerfilService: PerfilService,
    private router: Router) {
  }

  LogOut() {
    this.oAcademiaService.oAcademia = undefined;
    this.oUsuarioService.oUsuario = undefined;
    this.router.navigate(['/login']);
  }

  IsVisible(oMenu: string): boolean {
    if (!this.oPerfilService.oPerfil ||
      !this.oPerfilService.oPerfil.Nome) { return false; }

    const perfil: string = this.oPerfilService.oPerfil.Nome.toUpperCase();

    if (perfil === 'SUPER USUARIO') {
      if (oMenu === 'academia') { return true; }
      if (oMenu === 'usuario') { return true; }
      if (oMenu === 'mensalidade') { return true; }
      if (oMenu === 'email') { return true; }
      return false;
    } else if (perfil === 'ADMINISTRADOR') {
      if (oMenu === 'academia') { return false; }
      if (oMenu === 'usuario') { return true; }
      if (oMenu === 'mensalidade') { return true; }
      if (oMenu === 'email') { return true; }

      return false;
    } else if (perfil === 'PROFESSOR') {
      if (oMenu === 'academia') { return false; }
      if (oMenu === 'usuario') { return false; }
      if (oMenu === 'mensalidade') { return true; }
      return false;
    } else if (perfil === 'ALUNO') {
      if (oMenu === 'academia') { return false; }
      if (oMenu === 'usuario') { return false; }
      if (oMenu === 'mensalidade') { return true; }
      return false;
    }


  }

}

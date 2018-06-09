import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AcademiaService } from './academia.service';
import { PerfilService } from './perfil.service';

@Injectable()
export class SAMService {

  constructor(
    private oUsuarioService: UsuarioService,
    private oPerfilService: PerfilService,
    private oAcademiaService: AcademiaService) {

  }

  ValidateLogin(): Boolean {
    if (!this.oAcademiaService.oAcademia) { return false; }
    if (!this.oUsuarioService.oUsuario) { return false; }
    return true;
  }


  IsVisible(sKey: string): boolean {
    if (!this.oPerfilService.oPerfil ||
      !this.oPerfilService.oPerfil.Nome) { return false; }

    const perfil: string = this.oPerfilService.oPerfil.Nome.toUpperCase();

    if (perfil === 'SUPER USUARIO') {
      if (sKey === 'academia') { return true; }
      if (sKey === 'usuario') { return true; }
      if (sKey === 'mensalidade') { return true; }
      if (sKey === 'email') { return true; }
      if (sKey === 'mensalidade_dashboard') { return true; }
      if (sKey === 'minha_mensalidade_dashboard') { return false; }
      return false;
    } else if (perfil === 'ADMINISTRADOR') {
      if (sKey === 'academia') { return false; }
      if (sKey === 'usuario') { return true; }
      if (sKey === 'mensalidade') { return true; }
      if (sKey === 'email') { return true; }
      if (sKey === 'mensalidade_dashboard') { return true; }
      if (sKey === 'minha_mensalidade_dashboard') { return false; }


      return false;
    } else if (perfil === 'PROFESSOR') {
      if (sKey === 'academia') { return false; }
      if (sKey === 'usuario') { return false; }
      if (sKey === 'mensalidade') { return true; }
      if (sKey === 'mensalidade_dashboard') { return false; }
      if (sKey === 'minha_mensalidade_dashboard') { return true; }

      return false;
    } else if (perfil === 'ALUNO') {
      if (sKey === 'academia') { return false; }
      if (sKey === 'usuario') { return false; }
      if (sKey === 'mensalidade') { return true; }
      if (sKey === 'mensalidade_dashboard') { return false; }
      if (sKey === 'minha_mensalidade_dashboard') { return true; }


      return false;
    }


  }

}

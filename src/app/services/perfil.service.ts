import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Perfil } from '../models/Perfil';
import { Academia } from '../models/academia';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PerfilService {

  oPerfil: Perfil;

  constructor(private oHttpClient: HttpClient) { }

  public GetPerfil(oUsuario: Usuario, oAcademia: Academia): Observable<Perfil[]> {
    const obj: any = {};
    obj.UsuarioId = oUsuario.Id;
    obj.AcademiaId = oAcademia.Id;


    return Observable.create((obs) => {
      this.oHttpClient.post('ObtemPerfil', obj)
        .subscribe((data: any) => {
          if (data) {
            this.oPerfil = data[0];
            obs.next(data);
            obs.complete();
            return;
          }
          obs.next(undefined);
          obs.complete();
          return;
        });

    });
  }

  public isAdmin(targetPerfil: Perfil) {

    const perfil: string = targetPerfil.Nome.toUpperCase();

    if (perfil === 'SUPER USUARIO') {
      return true;
    } else if (perfil === 'ADMINISTRADOR') {
      return true;
    } else if (perfil === 'PROFESSOR') {
      return true;
    } else if (perfil === 'ALUNO') {
      return false;
    }
  }
}

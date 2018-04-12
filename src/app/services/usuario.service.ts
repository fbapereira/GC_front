import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuarioService {

  oUsuario: Usuario;

  constructor(private oHttpClient: HttpClient) { }

  public Login(oUsuario: Usuario): Observable<Boolean> {
    oUsuario.Login = oUsuario.Email;

    return Observable.create((obs) => {
      this.oHttpClient.post('Login', oUsuario)
        .subscribe((data: any) => {
          if (data) {
            this.oUsuario = data;
            obs.next(true);
            obs.complete();
            return;
          }
          obs.next(false);
          obs.complete();
          return;
        });

    });
  }


  public Obtem(oAcademia: Academia): Observable<any> {
    return this.oHttpClient.post('ObtemUsuariosAcademia', oAcademia);
  }

  public Altera(oUsuario: Usuario): Observable<any> {

    return this.oHttpClient.post('AlteraUsuario', oUsuario);
  }

  public Adiciona(oUsuario: Usuario): Observable<any> {
    return this.oHttpClient.post('GC_Usuario', oUsuario);
  }


  public Deleta(oUsuario: Usuario): Observable<any> {
    return this.oHttpClient.post('DeletaUsuario', oUsuario);
  }

  public RecuperaSenha(oUsuario: Usuario): Observable<any> {
    return this.oHttpClient.post('ResetarSenha', oUsuario);
  }
}

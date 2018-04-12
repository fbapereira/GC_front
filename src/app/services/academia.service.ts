import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AcademiaService {

  oAcademia: Academia;
  constructor(private oHttpClient: HttpClient) { }


  public GetAcademia(oUsuario: Usuario): Observable<any> {
    return this.oHttpClient.post('ObtemAcademiaUsuario', oUsuario);
  }

  public AdicionaUsuario(oUsuario: Usuario, oAcademia: Academia): Observable<any> {
    const oObj: any = {};
    oObj.GC_AcademiaId = oAcademia.Id;
    oObj.GC_UsuarioId = oUsuario.Id;
    return this.oHttpClient.post('AdicionaUsuarioAcademia', oObj);
  }
}

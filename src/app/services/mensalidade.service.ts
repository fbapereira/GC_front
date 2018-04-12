import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';
import { MensalidadeStatus } from '../models/mensalidade-status';

import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MensalidadeService {

  lstMensalidade: Mensalidade[];
  lstMensaliadadeStatus: MensalidadeStatus[];
  constructor(private oHttpClient: HttpClient) { }

  Adiciona(oMensalidade: Mensalidade, oAcademia: Academia, oUsuario: Usuario): Observable<any> {
    oMensalidade.GC_MensalidadeStatusId = 1;
    oMensalidade.GC_AcademiaId = oAcademia.Id;
    oMensalidade.GC_UsuarioId = oUsuario.Id;
    return this.oHttpClient.post('GC_Mensalidade', oMensalidade);
  }


  Vincula(oMensalidade: Mensalidade, oUsuario: Usuario): Observable<any> {
    const obj: any = {};
    obj.GC_UsuarioId = oUsuario.Id;
    obj.GC_MensalidadeId = oMensalidade.Id;
    return this.oHttpClient.post('AdicionaMensalidadeUsuario', obj);
  }

  GerarBoletos(oMensalidade: Mensalidade[]): Observable<any> {

    return this.oHttpClient.post('GerarBoletos', oMensalidade);
  }

  EnviarBoleto(oMensalidade: Mensalidade): Observable<any> {

    return this.oHttpClient.post('EnviaBoleto', oMensalidade);
  }

  GetMensalidade(oUsuario: Usuario): Observable<Mensalidade[]> {
    const that = this;
    return Observable.create((obs) => {
      this.LoadMensalidadeStatus()
        .subscribe((lstMensaliadadeStatus: MensalidadeStatus[]) => {
          that.lstMensaliadadeStatus = lstMensaliadadeStatus;
          return this.oHttpClient.post('ObtemMensalidade', oUsuario)
            .map((value: any) => {
              return this.MapStatus(value, that);
            })
            .subscribe((lstMensaliadadeMapped: Mensalidade[]) => {
              obs.next(lstMensaliadadeMapped);
              obs.complete();
            });
        });
    });
  }

  LoadMensalidadeStatus(): Observable<any> {
    return this.oHttpClient.get('GC_MensalidadeStatus');

  }

  AlteraStatus(oStatus: MensalidadeStatus, oMensalidade: Mensalidade): Observable<any> {
    const obj: any = {};
    obj.GC_StatusId = oStatus.Id;
    obj.GC_MensalidadeId = oMensalidade.Id;

    return this.oHttpClient.post('AlteraStatusMensalidade', obj);
  }

  public Deleta(oMensalidade: Mensalidade): Observable<any> {
    return this.oHttpClient.post('DeletaMensalidade', oMensalidade);
  }

  MapStatus(lstMensaliadadeUnmapped: Mensalidade[], that: any): Mensalidade[] {
    let temp = lstMensaliadadeUnmapped;

    for (let oMensalidade of temp) {
      const ostatus = that.lstMensaliadadeStatus.filter((oStatus: MensalidadeStatus) => {
        return oMensalidade.GC_MensalidadeStatusId == oStatus.Id;
      })[0];
      oMensalidade.MensaliadadeStatus = ostatus;
    }

    return temp;
  }

}

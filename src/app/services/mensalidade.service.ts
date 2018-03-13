import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GCHTTPService } from './GC-Http.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { Mensalidade } from '../models/mensalidade';
import { MensalidadeStatus } from '../models/mensalidade-status';

import 'rxjs/add/operator/map';

@Injectable()
export class MensalidadeService {

    lstMensalidade: Mensalidade[];
    lstMensaliadadeStatus: MensalidadeStatus[];
    constructor(private GCHTTP: GCHTTPService) { }

    Adiciona(oMensalidade: Mensalidade, oAcademia: Academia, oUsuario: Usuario): Observable<Mensalidade> {
        oMensalidade.GC_MensalidadeStatusId = 1;
        oMensalidade.GC_AcademiaId = oAcademia.Id;
        oMensalidade.GC_UsuarioId = oUsuario.Id;
        return this.GCHTTP.Post('GC_Mensalidade', oMensalidade);
    }


    Vincula(oMensalidade: Mensalidade, oUsuario: Usuario): Observable<Mensalidade> {
        const obj: any = {};
        obj.GC_UsuarioId = oUsuario.Id;
        obj.GC_MensalidadeId = oMensalidade.Id;
        return this.GCHTTP.Post('AdicionaMensalidadeUsuario', obj);
    }

    GerarBoletos(oMensalidade: Mensalidade[]): Observable<boolean> {

        return this.GCHTTP.Post('GerarBoletos', oMensalidade);
    }

    GetMensalidade(oUsuario: Usuario): Observable<Mensalidade[]> {
        debugger;
        const that = this;
        return Observable.create((obs) => {
            if (!this.lstMensaliadadeStatus) {
                this.LoadMensalidadeStatus()
                    .subscribe((lstMensaliadadeStatus: MensalidadeStatus[]) => {
                        that.lstMensaliadadeStatus = lstMensaliadadeStatus;
                        return this.GCHTTP.Post('ObtemMensalidade', oUsuario)
                            .map((value: any) => {
                                return this.MapStatus(value, that);
                            })
                            .subscribe((lstMensaliadadeMapped: Mensalidade[]) => {
                                obs.next(lstMensaliadadeMapped);
                                obs.complete();
                            });
                    });
            } else {
                return this.GCHTTP.Post('ObtemMensalidade', oUsuario)
                    .map((value: any) => {
                        return this.MapStatus(value, that);
                    })
                    .subscribe((lstMensaliadadeMapped: Mensalidade[]) => {
                        obs.next(lstMensaliadadeMapped);
                        obs.complete();
                    });
            }
        });
    }

    LoadMensalidadeStatus(): Observable<MensalidadeStatus[]> {
        return this.GCHTTP.Get('GC_MensalidadeStatus');

    }

    public Deleta(oMensalidade: Mensalidade): Observable<any> {
        return this.GCHTTP.Post('DeletaMensalidade', oMensalidade);
    }

    MapStatus(lstMensaliadadeUnmapped: Mensalidade[], that: any): Mensalidade[] {
        lstMensaliadadeUnmapped.forEach((oMensalidade: Mensalidade) => {
            oMensalidade.MensaliadadeStatus = that.lstMensaliadadeStatus.filter((oStatus: MensalidadeStatus) => {
                return oMensalidade.GC_MensalidadeStatusId === oStatus.Id;
            })[0];
        });
        return lstMensaliadadeUnmapped;
    }

}

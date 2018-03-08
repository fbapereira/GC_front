import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GCHTTPService } from './GC-Http.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';

@Injectable()
export class UsuarioService {

    oUsuario: Usuario;

    constructor(private GCHTTP: GCHTTPService) { }

    public Login(oUsuario: Usuario): Observable<Boolean> {
        oUsuario.Login = oUsuario.Email;

        return Observable.create((obs) => {
            this.GCHTTP.Post('Login', oUsuario)
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


    public Obtem(oAcademia: Academia): Observable<Usuario[]> {
        return this.GCHTTP.Post('ObtemUsuariosAcademia', oAcademia);
    }

    public Altera(oUsuario: Usuario): Observable<any> {
        return this.GCHTTP.Put('GC_Usuario/' + oUsuario.Id, oUsuario);
    }

    public Adiciona(oUsuario: Usuario): Observable<any> {
        return this.GCHTTP.Put('GC_Usuario', oUsuario);
    }
}

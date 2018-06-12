
import { OnInit, Component, ReflectiveInjector, Injector } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/base-component';
import { PerfilService } from '../services/perfil.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './eu.component.html',
    styleUrls: []
})

export class EuComponent extends BaseComponent {
    oUsuario: Usuario;
    sCPF: string = '';

    constructor(private oUsuarioService: UsuarioService,
        oSAMService: SAMService,
        router: Router,
        private toast: ToastrService,
        private injector: Injector) {
        super(false, oSAMService, router);
    }

    search(): void {
        if (this.sCPF.length >= 11) {
            let param: Usuario = new Usuario();
            param.CPF = this.sCPF;
            this.oUsuarioService.ObtemResumo(param)
                .catch(() => {
                    this.toast.error("Não foi possivel localizar este CPF!", "Erro")
                    return [];
                })
                .subscribe((_usuario: Usuario) => {
                    if (!_usuario) {
                        this.toast.error("Não foi possivel localizar este CPF!", "Erro")
                        return [];
                    }
                    this.oUsuario = _usuario;
                })
        }
    }
}

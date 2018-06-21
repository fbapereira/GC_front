
import { OnInit, Component, ReflectiveInjector, Injector } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SAMService } from '../services/sam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../shared/base-component';
import { PerfilService } from '../services/perfil.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './eu.component.html',
    styleUrls: []
})

export class EuComponent extends BaseComponent implements OnInit {
    oUsuario: Usuario;
    sCPF: string = '';
    mensalidadeID: string;
    constructor(private oUsuarioService: UsuarioService,
        oSAMService: SAMService,
        router: Router,
        private toast: ToastrService,
        private injector: Injector,
        private activatedRoute: ActivatedRoute) {
        super(false, oSAMService, router);
    }


    ngOnInit() {
        // subscribe to router event
        this.activatedRoute.params.subscribe((params: any) => {
            let userId = params['cpf'];
            let mensalidadeID = params['id'];

            if (mensalidadeID) {
                this.mensalidadeID = mensalidadeID;
            }

            if (userId) {
                this.sCPF = userId;
                this.search();
            }

        });
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

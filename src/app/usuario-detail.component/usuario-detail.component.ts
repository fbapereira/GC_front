
import { OnInit, Component, Input } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { AcademiaService } from '../services/academia.service';
import { BaseComponent } from '../shared/base-component';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gc-usuario-detail',
    templateUrl: './usuario-detail.component.html',
    styleUrls: []
})

export class UsuarioDetailComponent extends BaseComponent {
    @Input()
    targetUsuario: Usuario;

    @Input()
    isEditavel: Boolean;

    constructor(
        private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        oSAMService: SAMService,
        router: Router) {
        super(true, oSAMService, router);
    }

}

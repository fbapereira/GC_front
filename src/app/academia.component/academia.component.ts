
import { OnInit, Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { BaseComponent } from '../shared/base-component';
import { Router } from '@angular/router';
import { SAMService } from '../services/sam.service';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './academia.component.html',
    styleUrls: []
})

export class AcademiaComponent extends BaseComponent {
    constructor(
        private oUsuarioService: UsuarioService,
        oSAMService: SAMService,
        router: Router) {
        super(false, oSAMService, router);
    }
}

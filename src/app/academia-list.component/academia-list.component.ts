
import { OnInit, Component } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
    selector: 'app-gc-academia-list',
    templateUrl: './academia-list.component.html',
    styleUrls: []
})

export class AcademiaListComponent {
    constructor(private oUsuarioService: UsuarioService) {

    }
}

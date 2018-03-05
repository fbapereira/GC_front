
import { OnInit, Component, Input } from '@angular/core';
import { MessageUI } from '../models/messageUI';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';

@Component({
    selector: 'app-gc-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: []
})

export class UsuarioListComponent implements OnInit {
    @Input()
    targetAcademia: Academia;

    lstUsuario: Usuario[] = [];

    constructor(private oUsuarioService: UsuarioService) {

    }

    ngOnInit(): void {
        if (this.targetAcademia) {
            this.oUsuarioService.Obtem(this.targetAcademia)
                .subscribe((lstUsuario: Usuario[]) => {
                    this.lstUsuario = lstUsuario;
                });
        }

    }
}

import { OnInit, Component, ViewChild } from "@angular/core";
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../models/usuario";
import { AcademiaService } from "../services/academia.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-gc-menu',
    templateUrl: './menu.component.html'
})

export class MenuComponent {

    constructor(
        private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService,
        private router: Router) {
    }

    LogOut() {
        this.oAcademiaService.oAcademia = undefined;
        this.oUsuarioService.oUsuario = undefined;
        this.router.navigate(['/login']);
    }

}

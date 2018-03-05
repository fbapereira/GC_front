import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AcademiaService } from './academia.service';

@Injectable()
export class SAMService {

    constructor(
        private oUsuarioService: UsuarioService,
        private oAcademiaService: AcademiaService) {

    }

    ValidateLogin(): Boolean {
        if (!this.oAcademiaService.oAcademia) { return false; }
        if (!this.oUsuarioService.oUsuario) { return false; }
        return true;
    }

}

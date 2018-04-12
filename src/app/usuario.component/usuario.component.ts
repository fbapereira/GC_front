
import { OnInit, Component } from '@angular/core'; import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { AcademiaService } from '../services/academia.service';
import { BaseComponent } from '../shared/base-component';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';
import { ErrorHandlerBridge } from '../services/error-handler/error-handler-bridge';

@Component({
  selector: 'app-gc-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})

export class UsuarioComponent extends BaseComponent {
  constructor(
    private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    oSAMService: SAMService,
    router: Router) {
    super(true, oSAMService, router);
  }

}

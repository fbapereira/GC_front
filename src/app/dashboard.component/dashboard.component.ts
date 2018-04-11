
import { OnInit, Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/base-component';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})

export class DashboardComponent extends BaseComponent {
  oUsuario: Usuario = new Usuario();
  constructor(private oUsuarioService: UsuarioService,
    oSAMService: SAMService,
    router: Router) {
    super(true, oSAMService, router);
    this.oUsuario = this.oUsuarioService.oUsuario;
  }
}

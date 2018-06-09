import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDetailComponent } from '../usuario-detail.component/usuario-detail.component';
import { AcademiaService } from '../services/academia.service';
import { PerfilService } from '../services/perfil.service';
import { SAMService } from '../services/sam.service';
import { BaseComponent } from '../shared/base-component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gc-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: []
})


export class AulasComponent extends BaseComponent {

  constructor(
    private toastr: ToastrService,
    private oUsuarioService: UsuarioService,
    private oAcademiaService: AcademiaService,
    private oPerfilService: PerfilService,
    oSAMService: SAMService,
    router: Router) {
    super(true, oSAMService, router);
  }
}

import { BaseComponent } from "../shared/base-component";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../services/usuario.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-gc-resumo-externo',
  templateUrl: './resumo-externo.component.html'
})
export class ResumoExternoComponent extends BaseComponent implements OnInit {
  oUsuario: Usuario = new Usuario();
  lstMensalidade: any[];

  constructor(private oUsuarioService: UsuarioService,
    oSAMService: SAMService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    router: Router) {
    super(false, oSAMService, router);

  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bodyImage');

  }

  Login(): void {
     
    if (!this.oUsuario.CPF) {
      this.toastr.error('Digite seu CPF');
      return;
    }
    this.oUsuarioService.ObtemResumo(this.oUsuario)
      .subscribe(
        (oUsuario: any) => {
          if (!oUsuario) {
            this.toastr.error('Dados não encontrado');
          }
          this.oUsuario = oUsuario;
        },
        (e: any) => {
          this.toastr.error('Erro ao buscar seus dados');

        }
      );
  }
}

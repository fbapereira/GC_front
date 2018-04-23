
import { OnInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Academia } from '../models/academia';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfilService } from '../services/perfil.service';
import { AcademiaService } from '../services/academia.service';
import { BaseComponent } from '../shared/base-component';
import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';
import { MensalidadeListComponent } from '../mensalidade-list.component/mensalidade-list.component';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/email.service';
import { Email } from '../models/email';
declare const $: any;

@Component({
  selector: 'app-gc-email',
  templateUrl: './email.component.html',
  styleUrls: []
})

export class EmailComponent extends BaseComponent implements OnInit {
  lstEmailFiltered: Email[];
  lstEmail: Email[];
  targetEmail: Email;
  sBusca: string;

  constructor(private oAcademiaService: AcademiaService,
    oSAMService: SAMService,
    private toastr: ToastrService,
    private oEmailService: EmailService,
    router: Router) {

    super(true, oSAMService, router);
  }

  ngOnInit(): void {
    this.oEmailService.Obtem(this.oAcademiaService.oAcademia)
      .subscribe((lstEmail: Email[]) => {
        lstEmail = lstEmail.sort((a: Email, b: Email) => {
          return b.Id - a.Id;
        });

        this.lstEmail = lstEmail;
        this.lstEmailFiltered = lstEmail;

      });
  }

  search(): void {
    if (!this.sBusca ||
      this.sBusca.length === 0) {
      this.lstEmailFiltered = this.lstEmail;
      return;
    }

    this.lstEmailFiltered = this.lstEmail.filter((x: Email) => {
      if (x.Email.toUpperCase().indexOf(this.sBusca.toUpperCase()) > -1) { return true; }
      if (x.Titulo.toUpperCase().indexOf(this.sBusca.toUpperCase()) > -1) { return true; }
      return false;
    });
  }

  viewDetail(oEmail: Email): void {
    this.targetEmail = oEmail;
  }

  close(): void {
    this.targetEmail = undefined;
  }
}

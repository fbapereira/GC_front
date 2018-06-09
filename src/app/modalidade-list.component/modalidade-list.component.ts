import { Component, OnInit } from "@angular/core";
import { ModalidadeService } from "../services/modalidade.service";
import { Modalidade } from "../models/modalidade";
import { BaseComponent } from "../shared/base-component";
import { AcademiaService } from "../services/academia.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-gc-modalidade-list',
  templateUrl: './modalidade-list.component.html',
})

export class ModalidadeListComponent
  extends BaseComponent
  implements OnInit {

  lstModalidade: Modalidade[];
  targetNewModalidade: Modalidade;
  targetAlteraModalidade: Modalidade;
  _router: Router;

  constructor(private oAcademiaService: AcademiaService,
    oSAMService: SAMService,
    router: Router,
    private oModalidadeService: ModalidadeService,
    private toastr: ToastrService) {

    super(true, oSAMService, router);

    this._router = router;
  }

  ngOnInit(): void {
    this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
      .subscribe((lstModalidade: Modalidade[]) => {
        this.lstModalidade = lstModalidade;
      });
  }

  Return(sKey: string): void {
    this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
      .subscribe((lstModalidade: Modalidade[]) => {
        this.lstModalidade = lstModalidade;

        if (sKey === 'NovaModalidade') {
          this.targetNewModalidade = undefined;
          return;
        }
        if (sKey === 'AlteraModalidade') {
          this.targetAlteraModalidade = undefined;
          return;
        }
        this._router.navigate(['/dashboard']);

      });


  }

  NovaModalidade(): void {
    this.targetNewModalidade = new Modalidade();

  }


  ApplyNovaModalidade(): void {
    if (!this.targetNewModalidade.Nome) {
      this.toastr.error('Por favor, Digite o nome', 'Nome');
      return;
    }


    this.oModalidadeService.Adiciona(this.targetNewModalidade)
      .subscribe(() => {
        this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
          .subscribe((lstModalidade: Modalidade[]) => {
            this.lstModalidade = lstModalidade;
            this.targetNewModalidade = undefined;
            this.toastr.success('Modalidade adicionada com sucesso', 'Modalidade');

          });
      });
  }

  AlteraModalidade(oModalidade: Modalidade): void {
    this.targetAlteraModalidade = oModalidade;
  }

  ApplyAlteraModalidade(): void {
    if (!this.targetAlteraModalidade.Nome) {
      this.toastr.error('Por favor, Digite o nome', 'Nome');
      return;
    }

    this.oModalidadeService.Altera(this.targetAlteraModalidade)
      .subscribe(() => {
        this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
          .subscribe((lstModalidade: Modalidade[]) => {
            this.lstModalidade = lstModalidade;
            this.targetAlteraModalidade = undefined;
            this.toastr.success('Modalidade alterada com sucesso', 'Modalidade');

          });
      });
  }

  ApagarModalidade(oModalidade: Modalidade): void {
    this.oModalidadeService.Apagar(oModalidade)
      .subscribe(() => {
        this.toastr.success('Modalidade apagada com sucesso', 'Modalidade');

        this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
          .subscribe((lstModalidade: Modalidade[]) => {
            this.lstModalidade = lstModalidade;
          });
      });
  }
}

import { Component, OnInit } from "@angular/core";
import { ModalidadeService } from "../services/modalidade.service";
import { Modalidade } from "../models/modalidade";
import { BaseComponent } from "../shared/base-component";
import { AcademiaService } from "../services/academia.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-gc-modalidade-list',
  templateUrl: './modalidade-list.component.html',
})

export class ModalidadeListComponent
  // extends BaseComponent
  implements OnInit {


  lstModalidade: Modalidade[];
  targetNewModalidade: Modalidade;
  targetAlteraModalidade: Modalidade;

  constructor(private oAcademiaService: AcademiaService,
    oSAMService: SAMService,
    private router: Router,
    private oModalidadeService: ModalidadeService) {

    // super(true, oSAMService, router);
  }

  ngOnInit(): void {
    this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
      .subscribe((lstModalidade: Modalidade[]) => {
        this.lstModalidade = lstModalidade;
      });
  }

  Return(sKey: string): void {
    if (sKey === 'NovaModalidade') {
      this.targetNewModalidade = undefined;
      return;
    }
    if (sKey === 'AlteraModalidade') {
      this.targetAlteraModalidade = undefined;
      return;
    }

    this.router.navigate(['/dashboard']);
  }

  NovaModalidade(): void {
    this.targetNewModalidade = new Modalidade();

  }


  ApplyNovaModalidade(): void {
    this.oModalidadeService.Adiciona(this.targetNewModalidade)
      .subscribe(() => {
        this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
          .subscribe((lstModalidade: Modalidade[]) => {
            this.lstModalidade = lstModalidade;
            this.targetNewModalidade = undefined;
          });
      });
  }

  AlteraModalidade(oModalidade: Modalidade): void {
    this.targetAlteraModalidade = oModalidade;
  }

  ApplyAlteraModalidade(oModalidade: Modalidade): void {
    this.oModalidadeService.Altera(this.targetNewModalidade)
      .subscribe(() => {
        this.oModalidadeService.Obtem(this.oAcademiaService.oAcademia)
          .subscribe((lstModalidade: Modalidade[]) => {
            this.lstModalidade = lstModalidade;
            this.targetNewModalidade = undefined;
          });
      });
  }
}

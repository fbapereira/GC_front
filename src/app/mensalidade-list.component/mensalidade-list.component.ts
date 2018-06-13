import { Component, Input, OnInit, OnChanges, ViewChild, EventEmitter, SimpleChanges } from "@angular/core";
import { Usuario } from "../models/usuario";
import { BaseComponent } from "../shared/base-component";
import { MensalidadeService } from "../services/mensalidade.service";
import { SAMService } from '../services/sam.service';
import { Router } from "@angular/router";
import { Mensalidade } from "../models/mensalidade";
import { Observable } from "rxjs/Observable";
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as moment from 'moment';
import { AcademiaService } from "../services/academia.service";
import { PagamentoComponent } from "../pagamento.component/pagamento.component";
import { PagSeguroComponent } from "../pagseguro.component/pagseguro.component";
import { MensalidadeAlteraComponent } from "../mensalidade-altera.component/mensalidade-altera.component";
import { ToastrService } from "ngx-toastr";
import { PagamentoPagSeguro } from "../models/pagamento-pagseguro";
import { BoletoService } from "../services/boleto.service";

@Component({
  selector: 'app-gc-mensalidade-list',
  templateUrl: './mensalidade-list.component.html',
})


export class MensalidadeListComponent extends BaseComponent implements OnInit, OnChanges {

  @Input()
  targetUsuario: Usuario;

  @Input()
  showAdd: Boolean;

  @Input()
  showPay: Boolean;

  @Input()
  showPayAdmin: Boolean;

  @Input()
  showBoletoOnly: Boolean;


  @Input()
  showExclude: Boolean;

  @ViewChild("boleto") boleto: PagamentoComponent;
  @ViewChild("pagseguro") pagseguro: PagSeguroComponent;
  @ViewChild("MensalidadeAltera") mensalidadeAltera: MensalidadeAlteraComponent;

  emitClose: EventEmitter<boolean> = new EventEmitter();

  oRouter: any;
  lstMensalidade: Mensalidade[];
  targetNewMensalidade: Mensalidade;
  targetPagamentoMensalidade: Mensalidade;
  targetAlteraMensalidade: Mensalidade;


  constructor(
    private toastr: ToastrService,
    private oMensalidadeService: MensalidadeService,
    private oAcademiaService: AcademiaService,
    private oBoletoService: BoletoService,
    oSAMService: SAMService,
    router: Router
  ) {
    super(false, oSAMService, router);
    this.oRouter = router;
  }

  ngOnInit(): void {
    if (this.targetUsuario) {
      this.oMensalidadeService.GetMensalidade(this.targetUsuario)
        .subscribe((lstMensalidade: Mensalidade[]) => {
          lstMensalidade.forEach((x: any) => {
            if (x.MensaliadadeStatus.Nome === 'Disponível') {
              x.MensaliadadeStatus.Nome = 'Paga';
            }

            if (x.MensaliadadeStatus.Nome === 'Cancelada') {
              x.MensaliadadeStatus.Nome = 'Aguardando Pagamento';
            }
          });
          this.lstMensalidade = lstMensalidade;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.targetUsuario) {
      this.oMensalidadeService.GetMensalidade(this.targetUsuario)
        .subscribe((lstMensalidade: Mensalidade[]) => {
          this.lstMensalidade = lstMensalidade;
        });
    }
  }


  NovoMensalidade(): void {
    this.targetNewMensalidade = new Mensalidade();
  }

  return(parcialReturn: boolean): void {
    if (!parcialReturn) {
      this.emitClose.emit(true);
    } else {

      this.oMensalidadeService.GetMensalidade(this.targetUsuario)
        .subscribe((lstMensalidade: Mensalidade[]) => {
          this.lstMensalidade = lstMensalidade;
        });
    }

    this.targetNewMensalidade = undefined;
    this.targetPagamentoMensalidade = undefined;
    this.targetAlteraMensalidade = undefined;
  }

  pagar(oMensalidade: Mensalidade): void {
    this.targetPagamentoMensalidade = oMensalidade;
  }

  enviar(oMensalidade: Mensalidade): void {
    this.oMensalidadeService.EnviarBoleto(oMensalidade).
      subscribe(() => {
        this.toastr.success('Boleto enviada com sucesso por e-mail', '[Mensalidade]')
        return;
      });
  }

  alterar(oMensalidade: Mensalidade): void {
    this.targetAlteraMensalidade = oMensalidade;
  }

  apagar(oMensalidade: Mensalidade): void {
    this.oMensalidadeService.Deleta(oMensalidade)
      .subscribe(() => {
        this.oMensalidadeService.GetMensalidade(this.targetUsuario)
          .subscribe((lstMensalidade: Mensalidade[]) => {
            this.toastr.success('Mensalidade apagada com sucesso', '[Mensalidade]')
            this.lstMensalidade = lstMensalidade;
            return;
          });
      });

  }

  print(oMensalidade: Mensalidade): void {
    this.oBoletoService.GetBoletos(oMensalidade)
      .subscribe((oPagamentoPagSeguro: PagamentoPagSeguro) => {
        if (!oPagamentoPagSeguro || !oPagamentoPagSeguro.BarCode) {
          this.toastr.error('Este boleto nao foi gerado por problemas no PagSeguro.', 'Erro');
          return;
        }
        window.open(oPagamentoPagSeguro.Link);
      });
  }

  CreateMensalidade(): void {
    const obs: Observable<Mensalidade>[] = [];
    const obsVinc: Observable<Mensalidade>[] = [];
    const lstMensalidade: Mensalidade[] = [];

    // Validação
    if (!this.targetNewMensalidade.parcela || this.targetNewMensalidade.parcela === 0) {
      this.toastr.info('Por favor, digite a quantidade de parcelas', '[Parcelas]')
      return;
    }

    if (!this.targetNewMensalidade.Valor || this.targetNewMensalidade.Valor <= 0) {
      this.toastr.info('Por favor, o valor da parcela deve ser maior que 0', '[Valor]')
      return;
    }

    if (!this.targetNewMensalidade.Vencimento || moment(this.targetNewMensalidade.Vencimento).isBefore(moment())) {
      this.toastr.info('Por favor, a data deve ser maior que hoje', '[Vencimento]')
      return;

    }


    if (!this.targetNewMensalidade.Vencimento ||
      moment(this.targetNewMensalidade.Vencimento).isAfter(moment().add(1, 'M').toDate())) {
      this.toastr.info('Por favor, a data deve ser em no maximo 30 dias', '[Vencimento]')
      return;
    }




    for (let _i = 0; _i < this.targetNewMensalidade.parcela; _i++) {
      lstMensalidade.push(this.targetNewMensalidade);
      obs.push(this.oMensalidadeService.Adiciona(
        Object.assign({}, this.targetNewMensalidade),
        this.oAcademiaService.oAcademia,
        this.targetUsuario));
      this.targetNewMensalidade.Vencimento = moment(this.targetNewMensalidade.Vencimento).add(1, 'M').toDate();
    }



    debugger;
    // Cria as mensalidades
    forkJoin(obs)
      .subscribe((oMensalidades: Mensalidade[]) => {
        // gera boleto
        this.oMensalidadeService.GerarBoletos(oMensalidades).
          subscribe((sReturn: Boolean) => {
            if (sReturn) {
              // Vincula ao usuario
              oMensalidades.forEach((oMensalidade: Mensalidade) => {
                obsVinc.push(this.oMensalidadeService.Vincula(oMensalidade, this.targetUsuario));
              });
              forkJoin(obsVinc).subscribe(() => {

                // Obtem a mensalidade com Id
                this.oMensalidadeService.GetMensalidade(this.targetUsuario)
                  .subscribe((lstMensalidadeWithId: Mensalidade[]) => {
                    this.lstMensalidade = lstMensalidadeWithId;
                    this.targetNewMensalidade = undefined;
                    return;
                  });
              });
              this.toastr.success('Mensalidades incluidas com sucesso', '[Mensalidades Incluídas]')
            } else {
              this.throwErrorForCreateMensalidade();
              return;
            }
          }, (e) => {
            this.throwErrorForCreateMensalidade();
            return;
          });
      });
  }

  throwErrorForCreateMensalidade(): void {
    this.oMensalidadeService.RollbackMensalidade(this.targetUsuario).subscribe(() => {
      // Obtem a mensalidade com Id
      this.oMensalidadeService.GetMensalidade(this.targetUsuario)
        .subscribe((lstMensalidadeWithId: Mensalidade[]) => {
          this.lstMensalidade = lstMensalidadeWithId;
          this.targetNewMensalidade = undefined;
          // FAZER EMITTER
          this.toastr.error('Pagseguro não respondeu como esperado tente mais tarde', '[Erro]');
          return;
        });
    });
  }

  payment(): void {
    this.pagseguro.getMethods();
  }

  AlterMensalidade(): void {

    this.oMensalidadeService
      .AlteraStatus(this.mensalidadeAltera.targetMensalidade.MensaliadadeStatus, this.mensalidadeAltera.targetMensalidade).
      subscribe(() => {
        this.return(true);

        this.toastr.success('Mensalidade alterada com sucesso', '[Mensalidades Alterada]')

        this.oMensalidadeService.GetMensalidade(this.targetUsuario)
          .subscribe((lstMensalidade: Mensalidade[]) => {

            this.lstMensalidade = lstMensalidade;
          });
      });

  }
}

import { BaseComponent } from "../shared/base-component";
import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { PagseguroService } from "../services/pagseguro.service";
import { SAMService } from "../services/sam.service";
import { Router } from "@angular/router";
import { AcademiaService } from "../services/academia.service";
import { Observable } from "rxjs/Observable";
import { Mensalidade } from "../models/mensalidade";

declare var PagSeguroDirectPayment: any;

@Component({
  selector: 'app-gc-pagseguro',
  templateUrl: './pagseguro.component.html',
  styleUrls: []
})

export class PagSeguroComponent extends BaseComponent implements AfterViewInit {

  @Input()
  targetMensalidade: Mensalidade;

  hash: string;
  lstPayMethod: PayMethods[] = [];
  targetPayMethod: PayMethods;

  targetCard: Card = new Card();
  targetBrand: Brand;

  routerr: Router;
  constructor(private pagseguroService: PagseguroService, private academiaService: AcademiaService,
    oSAMService: SAMService,
    router: Router
  ) {
    super(false, oSAMService, router);
    this.routerr = router;
    this.injectScripts();
  }

  ngAfterViewInit(): void {
    if (this.academiaService.oAcademia && this.lstPayMethod.length === 0) {
      const that = this;
      this.pagseguroService.iniciaSessao(this.academiaService.oAcademia)
        .subscribe((idSessao: String) => {
          PagSeguroDirectPayment.setSessionId(idSessao);
          this.getMethods().subscribe((a: PayMethods[]) => {
            that.lstPayMethod = a.filter((oPayMethods: PayMethods) => {
              return oPayMethods.mainName === 'CREDIT_CARD';
            });
          });
        });
    }

  }

  getBrand(): void {
    if (this.targetCard.number.toString().length === 16) {
      let bin = this.targetCard.number.toString();
      const that = this;
      PagSeguroDirectPayment.getBrand({
        cardBin: bin,
        success: function (response) {
          that.targetBrand = response.brand;
          that.targetPayMethod = that.lstPayMethod.filter((oPayMethod: PayMethods) => {
            return that.targetBrand.name.toUpperCase() === oPayMethod.name.toUpperCase();
          })[0];
        },
        error: function (response) {
          //tratamento do erro
        },
        complete: function (response) {
          //tratamento comum para todas chamadas
        }
      });
    }
  }

  injectScripts() {
    // adiciona JS
    // tslint:disable-next-line:no-unused-expression
    new Promise((resolve) => {
      const script: HTMLScriptElement = document.createElement('script');
      script.addEventListener('load', r => resolve());
      script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
      document.head.appendChild(script);
    });

  }

  getMethods(): Observable<PayMethods[]> {

    return Observable.create((obs) => {
      const that = this;

      this.hash = PagSeguroDirectPayment.getSenderHash();
      PagSeguroDirectPayment.getPaymentMethods({
        amount: this.targetMensalidade.Valor.toFixed(2),
        success: function (response) {
          obs.next(that.processMethods(response));
          obs.complete();
        },
        error: function (response) {
          obs.next(false);
          obs.complete();
        },
        complete: function (response) {
          // this2.processMethods(response, this2);

        }
      });

    });
  }

  processMethods(response): PayMethods[] {
    const lstPaymethod = [];
    const oResponse = response;
    Object.keys(response.paymentMethods).forEach((method: any) => {
      const nResponse = oResponse;
      const mainName = method;

      Object.keys(oResponse.paymentMethods[method].options).forEach((option: any) => {
        const oPayMethod: PayMethods = new PayMethods();
        oPayMethod.mainName = mainName;
        oPayMethod.displayName = nResponse.paymentMethods[method].options[option].displayName;
        oPayMethod.name = nResponse.paymentMethods[method].options[option].name;
        oPayMethod.code = nResponse.paymentMethods[method].options[option].code;
        if (nResponse.paymentMethods[method].options[option].images &&
          nResponse.paymentMethods[method].options[option].images.SMALL) {
          oPayMethod.image = nResponse.paymentMethods[method].options[option].images.SMALL.path;
        }
        lstPaymethod.push(oPayMethod);
      });
    });
    return lstPaymethod;
  }

  pay(): void {
    Observable.create((obs) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.targetCard.number,
        cvv: this.targetCard.cvv,
        expirationMonth: this.targetCard.mes,
        expirationYear: this.targetCard.ano,
        success: function (response) {
          obs.next(response);
          obs.complete();
        },
        error: function (e) {
          obs.next(e);
          obs.complete();
        }
      });
    }).subscribe((token: any) => {
      this.pagseguroService.checkout(this.targetMensalidade, token.card.token, this.hash)
        .subscribe((obj: any) => {
          this.routerr.navigate(['Dashboard']);
        });
    });
  }
}

export class PayMethods {
  mainName: String;
  displayName: String;
  image: String;
  code: Number;
  name: String;

}

export class Card {
  number: String;
  cvv: String;
  mes: String;
  ano: String;
}

export class Brand {
  name: string;
  bin: number;
  cvvSize: number;
  expirable: boolean;
  validationAlgorithm: string;

}

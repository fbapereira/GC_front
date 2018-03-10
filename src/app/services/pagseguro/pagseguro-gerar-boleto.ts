import { Injectable } from "@angular/core";
import { Academia } from "../../models/academia";
import { Mensalidade } from "../../models/mensalidade";
import { Usuario } from "../../models/usuario";
import { BaseService } from "../../shared/base-service";

@Injectable()
export class PagseguroGerarBoletoService extends BaseService {

    Payload = `
    {
        "reference": "#Mensalidade_ID#",
        "firstDueDate": "#FirstDueDate#",
        "numberOfPayments": "#numberOfPayments#",
        "periodicity": "monthly",
        "amount": "#amount#",
        "instructions": "juros de 1% ao dia e mora de 5,00",
        "description": "Pagamento da #AcademiaNome#",
        "customer": {
            "document": {
                "type": "CPF",
                "value": "#CPF#"
            },
            "name": "#Name#",
            "email": "#Email#",
            "phone": {
                "areaCode": "11",
                "number": "99999999"
            },
            "address": {
                "postalCode": "06065120",
                "street": "Av. Capistrano de Abreu",
                "number": "486",
                "district": "Osasco",
                "city": "Sao Paulo",
                "state": "SP"
            }
        }
    }
    `;



    public GerarBoletos(oAcademia: Academia, oUsuario: Usuario, lstMensalidade: Mensalidade[]): void {

        let sBody: string = this.transformBody(this.Payload,
            [
                ['#Mensalidade_ID#', lstMensalidade.length.toString()],
                ['#FirstDueDate#', lstMensalidade[0].Vencimento.toDateString()],
                ['#amount#', lstMensalidade[0].Valor.toFixed(2)],
                ['#CPF#', oUsuario.CPF],
                ['#AcademiaNome#', oAcademia.nome],
                ['#Name#', oUsuario.Nome],
                ['#Email#', oUsuario.Email]
            ]);

    }

}

import { MensalidadeStatus } from "./mensalidade-status";

export class Mensalidade {
    Id: number;
    Valor: number;
    Vencimento: Date;
    MensaliadadeStatus: MensalidadeStatus;
    GC_MensalidadeStatusId: any;
    parcela: number;
}

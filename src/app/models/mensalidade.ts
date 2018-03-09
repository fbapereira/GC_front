import { MensalidadeStatus } from "./mensalidade-status";

export class Mensalidade {
    Id: Number;
    Valor: Number;
    Vencimento: Date;
    MensaliadadeStatus: MensalidadeStatus;
    GC_MensalidadeStatusId: Number;
}

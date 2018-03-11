import { MensalidadeStatus } from "./mensalidade-status";

export class Mensalidade {
    Id: number;
    Valor: number;
    Vencimento: Date;
    MensaliadadeStatus: MensalidadeStatus;
    GC_MensalidadeStatusId: any;
    GC_AcademiaId: number;
    GC_UsuarioId: number;
    parcela: number;
}

import { Usuario } from "./usuario";
import { MensalidadeStatus } from "./mensalidade-status";

export class MensalidadeDetalhe {
  Id: number;
  Observacao: string;
  Usuario: Usuario;
  LogDate: Date;
  Status: MensalidadeStatus;
}

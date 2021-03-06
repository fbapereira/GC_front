import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { SAMService } from '../services/sam.service';
import { PerfilService } from '../services/perfil.service';
import { MensalidadeService } from '../services/mensalidade.service';
import { BoletoService } from '../services/boleto.service';
import { PagseguroService } from '../services/pagseguro.service';
import { ReportService } from '../services/report.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GCHttpInterceptor } from '../services/interceptor/http-interceptor';
import { ErrorHandlerBridge } from '../services/error-handler/error-handler-bridge';
import { EmailService } from '../services/email.service';
import { TokenService } from '../services/token.service';
import { ModalidadeService } from '../services/modalidade.service';

export const GC_SERVICES = [

  UsuarioService,
  AcademiaService,
  SAMService,
  PerfilService,
  MensalidadeService,
  BoletoService,
  PagseguroService,
  ReportService,
  EmailService,
  ErrorHandlerBridge,
  GCHttpInterceptor,
  TokenService,
  ModalidadeService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GCHttpInterceptor,
    multi: true
  }
];

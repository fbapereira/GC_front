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

export const GC_SERVICES = [

  UsuarioService,
  AcademiaService,
  SAMService,
  PerfilService,
  MensalidadeService,
  BoletoService,
  PagseguroService,
  ReportService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: GCHttpInterceptor,
    multi: true
  }
];

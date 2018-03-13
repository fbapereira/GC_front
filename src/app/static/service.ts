import { GCHTTPService } from '../services/GC-Http.service';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { SAMService } from '../services/sam.service';
import { PerfilService } from '../services/perfil.service';
import { MensalidadeService } from '../services/mensalidade.service';
import { BoletoService } from '../services/boleto.service';

export const GC_SERVICES = [
    GCHTTPService,
    UsuarioService,
    AcademiaService,
    SAMService,
    PerfilService,
    MensalidadeService,
    BoletoService
];

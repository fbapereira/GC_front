import { GCHTTPService } from '../services/GC-Http.service';
import { UsuarioService } from '../services/usuario.service';
import { AcademiaService } from '../services/academia.service';
import { SAMService } from '../services/sam.service';

export const GC_SERVICES = [
    GCHTTPService,
    UsuarioService,
    AcademiaService, 
    SAMService
];

import { SAMService } from '../services/sam.service';
import { Router } from '@angular/router';

export class BaseComponent {
    constructor(
        needToBeLogged: boolean,
        private oSAMService: SAMService,
        private router: Router
    ) {
        if (needToBeLogged && !oSAMService.ValidateLogin()) {
            router.navigate(['login']);
        }
    }

}

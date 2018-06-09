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

  public returnDashboard() {
    this.router.navigate(['dashboard']);
  }

  public validaEmail(oEmail: string): Boolean {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return !(oEmail != "" && (oEmail.length <= 5 || !EMAIL_REGEXP.test(oEmail)));
  }
}

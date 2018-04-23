import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Academia } from '../models/academia';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/email';

@Injectable()
export class EmailService {

  oEmail: Email;

  constructor(private oHttpClient: HttpClient) { }

  public Obtem(oAcademia: Academia): Observable<any> {
    return this.oHttpClient.post('ObtemEmail', oAcademia);
  }
}

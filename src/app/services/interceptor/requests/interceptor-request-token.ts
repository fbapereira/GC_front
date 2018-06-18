import { Interceptor } from '../interceptor';
import { EventEmitter, Injector } from '@angular/core';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from '../../token.service';

/**
 * intercept request to send monitoring info
 */
export class InterceptorRequestToken extends Interceptor.Request {

  private oTokenService: TokenService;
  constructor(params?: { [id: string]: any; }, injector?: Injector) {
    super();

    this.oTokenService = injector.get(TokenService);

  }

  treat(oHttpRequest: HttpRequest<any>): HttpRequest<any> {
    let oHeader: HttpHeaders = new HttpHeaders();

    if (this.oTokenService &&
      this.oTokenService.oToken) {
      oHeader = oHeader.set("Authorization", "bearer " + this.oTokenService.oToken);
    }

    if (oHttpRequest.method === 'POST') {
      return new HttpRequest(
        oHttpRequest.method,
        oHttpRequest.url,
        oHttpRequest.body,
        {
          'headers': oHeader,
          'reportProgress': oHttpRequest.reportProgress,
          'params': oHttpRequest.params,
          'responseType': oHttpRequest.responseType,
          'withCredentials': oHttpRequest.withCredentials
        });
    } else if (oHttpRequest.method === 'GET') {
      return new HttpRequest(
        oHttpRequest.method,
        oHttpRequest.url,
        {
          'headers': oHeader,
          'reportProgress': oHttpRequest.reportProgress,
          'params': oHttpRequest.params,
          'responseType': oHttpRequest.responseType,
          'withCredentials': oHttpRequest.withCredentials
        });
    }
    return this.createHttpRequest(oHttpRequest, oHttpRequest.url, oHttpRequest.body)
  }
}

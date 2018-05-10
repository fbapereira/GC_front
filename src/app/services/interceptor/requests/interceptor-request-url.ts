import { Interceptor } from '../interceptor';
import { EventEmitter, Injector } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * intercept request to send monitoring info
 */
export class InterceptorRequestUrl extends Interceptor.Request {

  constructor(params?: { [id: string]: any; }, injector?: Injector) {
    super();
  }

  treat(oHttpRequest: HttpRequest<any>): HttpRequest<any> {
    return this.createHttpRequest(oHttpRequest, this.TrataUrl(oHttpRequest.url), oHttpRequest.body)
  }

  private TrataUrl(url: string): string {
    return '/Api/' + url;
  }
}

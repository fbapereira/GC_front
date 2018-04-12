import { Interceptor } from '../interceptor';
import { EventEmitter } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * intercept request to send monitoring info
 */
export class InterceptorRequestUrl extends Interceptor.Request {

  _urlBase: String = 'http://localhost:59912/Api/';
  urlBase: String = 'http://app.basicflux.com/Api/';

  treat(oHttpRequest: HttpRequest<any>): HttpRequest<any> {
    return this.createHttpRequest(oHttpRequest, this.TrataUrl(oHttpRequest.url), oHttpRequest.body)
  }

  private TrataUrl(url: string): string {
    if (url.indexOf('http') > -1) { return url; }
    return this.urlBase + url;
  }
}

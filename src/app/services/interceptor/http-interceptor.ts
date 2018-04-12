import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Interceptor } from './interceptor';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { InterceptorRequestUrl } from './requests/interceptor-request-url';


@Injectable()
/**
 * Process all HTTP requests in system.
 */
export class GCHttpInterceptor implements HttpInterceptor {

  /**
   * Emits all errors that occurs inside http interceptor
   */
  public errorEmitter: EventEmitter<any> = new EventEmitter();

  /**
   * Emits databetween interceptors
   */
  public dataEmitter: EventEmitter<any> = new EventEmitter();

  /**
   * Show last error emitted
   */
  // private lastError: ErrorHandlerTypeEnum = undefined;

  /**
   * Determine connection status
   */
  public isConnectAlive: Boolean;

  /**
   * All requests interceptor
   */
  private lstInterceptorsRequest: Interceptor.Request[] = [];

  /**
   * All failed interceptor
   */
  private lstInterceptorsFail: Interceptor.Fail[] = [];

  /**
   * All response interceptor
   */
  private lstInterceptorsResponse: Interceptor.Response[] = [];

  constructor() {

    this.isConnectAlive = true;

    // load parameters
    this.generateParams()
      .catch((err: any) => {
        // this.emitError(ErrorHandlerTypeEnum.CONFIGURATION_ERROR);
        throw (err);
      })
      .subscribe((params: { [id: string]: any; }) => {
        // load interceptors
        this.lstInterceptorsFail = this.getFailsInterceptors(params);
        this.lstInterceptorsRequest = this.getRequestInterceptors(params);
        this.lstInterceptorsResponse = this.getResponseInterceptors(params);
      });
  }

  /**
   * generates all parameters for any Interceptor
   */
  private generateParams(): Observable<{ [id: string]: any; }> {
    // Creates a dic
    const params: { [id: string]: any; } = {};

    params['data_emitter'] = this.dataEmitter;
    params['fn_emit_erro'] = this.emitError;

    // return
    return Observable.of(params);
  }

  /**
    *  Get all interceptors for requests
    * @param params
    */
  private getRequestInterceptors(params: { [id: string]: any; }): Interceptor.Request[] {
    const interceptors = [];
    interceptors.push(new InterceptorRequestUrl());
    return interceptors;
  }

  /**
    *  Get all interceptors for fails
    * @param params
    */
  private getFailsInterceptors(params: { [id: string]: any; }): Interceptor.Fail[] {
    const interceptors = [];
    return interceptors;
  }

  /**
   *  Get all interceptors for response
   * @param params
   */
  private getResponseInterceptors(params: { [id: string]: any; }): Interceptor.Response[] {
    const interceptors = [];
    return interceptors;
  }

  /**
   * emits error
   * @param error
   */
  private emitError(error: any) {
    try {
      //this.lastError = error;
      this.isConnectAlive = false;
      this.errorEmitter.next(error);
      this.errorEmitter.complete();
    } catch (e) {
      // Do Nothing
    }
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // validate the connection
    // if (this.lastError) {
    //   this.emitError(this.lastError);
    //   return;
    // }

    if (!this.isConnectAlive) {
      throw new Error("No connection");
    }

    // intercept request
    this.lstInterceptorsRequest.forEach((x: Interceptor.Request) => { req = x.treat(req); });

    return Observable.create((obs) => {
      // execute http request

      next.handle(req)
        .subscribe(
          (resp: any) => {
            // intercept response
            this.lstInterceptorsResponse.forEach((x: Interceptor.Response) => { resp = x.treat(resp); });
            obs.next(resp);
          },
          (err => {
            // intercept fail
            this.lstInterceptorsFail.forEach((x: Interceptor.Fail) => { err = x.treat(err); });
            return Observable.of(err);
          }),
          () => {
            obs.complete();
          });
    });
  }
}

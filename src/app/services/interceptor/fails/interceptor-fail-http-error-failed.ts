import { Interceptor } from "../interceptor";
import { HttpResponse } from "@angular/common/http";
import { Injector } from "@angular/core";
import { GCHttpInterceptor } from "../http-interceptor";

export class InterceptorFailHttpErrorFailed extends Interceptor.Fail {

  /**
   * Function to throw error
   */
  private fnEmitError: Function;
  private oGCHttpInterceptor: GCHttpInterceptor;
  private injector: any;

  constructor(params?: { [id: string]: any; }, injector?: Injector) {
    super();
    // get params
    this.injector = injector;
  }

  treat(err: HttpResponse<any>): HttpResponse<any> {
    this.oGCHttpInterceptor = this.injector.get(GCHttpInterceptor);
    this.oGCHttpInterceptor.emitError(err);
    return err;

  }
}

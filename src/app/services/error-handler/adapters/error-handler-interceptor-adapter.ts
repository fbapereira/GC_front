import { ErrorHandlerObject } from "../error-handler-object";
import { ErrorHandlerAdapter } from "./error-handler-adapter";
import { ErrorHandlerTypeEnum } from "../enums/error-handler-type.enum";
import { Injectable, ReflectiveInjector, Injector } from "@angular/core";
import { ErrorHandlerActionEnum } from '../enums/error-handler-action.enum';
import { GCHttpInterceptor } from '../../interceptor/http-interceptor';

/**
 * Interpretates Interceptor error
 */
export class ErrorHandlerInterceptorAdapter extends ErrorHandlerAdapter {

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * Watch error comming from interceptor
   */
  public watchError() {

    // get FrontUnicoHttpInterceptor service
    const oGCHttpInterceptor: GCHttpInterceptor = this.oInjector.get(GCHttpInterceptor);

    oGCHttpInterceptor.errorEmitter
      .subscribe((oErrorHandlerTypeEnum: ErrorHandlerTypeEnum) => {
         
        // create object
        const oErrorHandlerObject: ErrorHandlerObject = new ErrorHandlerObject();

        oErrorHandlerObject.enumErrorHandlerActionEnum = ErrorHandlerActionEnum.RESTART_SESSION;
        oErrorHandlerObject.enumErrorHandlerTypeEnum = oErrorHandlerTypeEnum;
        oErrorHandlerObject.isConnectionKiller = false;
        oErrorHandlerObject.error = new Error('Interceptor Http Error')
        oErrorHandlerObject.message = 'Um erro inesperado aconteceu';
        oErrorHandlerObject.tilte = 'Erro';

        // emits error x
        this.onError.next(oErrorHandlerObject);

        // if Connection is alive, the decide between kill it or not
        if (oGCHttpInterceptor.isConnectAlive) {
          oGCHttpInterceptor.isConnectAlive = oErrorHandlerObject.isConnectionKiller;
        }
      });
  }
}

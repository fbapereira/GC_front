import { ErrorHandlerAdapter } from "./error-handler-adapter";
import { ErrorHandler } from "@angular/core";
import { ErrorHandlerObject } from "../error-handler-object";
import { ErrorHandlerActionEnum } from "../enums/error-handler-action.enum";
import { ErrorHandlerTypeEnum } from "../enums/error-handler-type.enum";
import { GCHttpInterceptor } from "../../interceptor/http-interceptor";

/**
 * Adapt base geral errors - TO BE IMPLEMENTED
 */
export class ErrorHandlerGeneralAdapter extends ErrorHandlerAdapter implements ErrorHandler {
  oGCHttpInterceptor: GCHttpInterceptor;


  handleError(error: any): void {
    // create object
    const oErrorHandlerObject: ErrorHandlerObject = new ErrorHandlerObject();

    oErrorHandlerObject.enumErrorHandlerActionEnum = ErrorHandlerActionEnum.RESTART_SESSION;
    oErrorHandlerObject.enumErrorHandlerTypeEnum = ErrorHandlerTypeEnum.LEAN_ERROR;
    oErrorHandlerObject.isConnectionKiller = false;
    oErrorHandlerObject.error = error;
    oErrorHandlerObject.message = "Um erro inesperado aconteceu";
    oErrorHandlerObject.tilte = "Erro";

    // emits error x
    this.onError.next(oErrorHandlerObject);

    // if Connection is alive, the decide between kill it or not
    if (this.oGCHttpInterceptor.isConnectAlive) {
      this.oGCHttpInterceptor.isConnectAlive = oErrorHandlerObject.isConnectionKiller;
    }

  }

  public watchError() {
    // Waiting for architeture
    // get FrontUnicoHttpInterceptor service
    this.oGCHttpInterceptor = this.oInjector.get(GCHttpInterceptor);
  }
}

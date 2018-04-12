import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ErrorHandlerObject } from './error-handler-object';
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { ErrorHandlerAdapter } from './adapters/error-handler-adapter';
import { ErrorHandlerInterceptorAdapter } from './adapters/error-handler-interceptor-adapter';
import { ErrorHandlerGeneralAdapter } from './adapters/error-handler-general-adapter';
import { ToastrService } from 'ngx-toastr';

@Injectable()
/**
 * Manage error to component
 */
export class ErrorHandlerBridge {

  /**
   * Emit standard errors
   */
  public onError: EventEmitter<ErrorHandlerObject>;

  constructor(private injector: Injector,
    private toastr: ToastrService) {
    // get all errors adapters
    let adapters: ErrorHandlerAdapter[] = this.getAdapter();

    // Subscribe in all adapters
    adapters.forEach((adapter: ErrorHandlerAdapter) => {
      adapter.onError
        .subscribe((oErrorHandlerObject: ErrorHandlerObject) => {
          this.toastr.error(oErrorHandlerObject.message, oErrorHandlerObject.tilte)
          // this.onError.next(oErrorHandlerObject);
        });
    });
  }

  /**
   * get all adapters
   */
  getAdapter(): ErrorHandlerAdapter[] {
    return [
      new ErrorHandlerInterceptorAdapter(this.injector),
      new ErrorHandlerGeneralAdapter(this.injector),
    ];
  }


}

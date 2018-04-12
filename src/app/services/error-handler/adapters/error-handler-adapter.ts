import { EventEmitter, Injector } from "@angular/core";
import { ErrorHandler } from "@angular/router/src/router";
import { ErrorHandlerObject } from "../error-handler-object";

/**
 * Abstraction for Error Handler
 */
export abstract class ErrorHandlerAdapter {
  /**
   * Injector to get services
   */
  protected oInjector: Injector;

  /**
   * Erro emitter for
   */
  public onError: EventEmitter<ErrorHandlerObject> = new EventEmitter();

  constructor(private injector: Injector) {
    this.oInjector = injector;
    this.watchError();
  }

  /**
   * watchs error`s events
   */
  public abstract watchError();
}

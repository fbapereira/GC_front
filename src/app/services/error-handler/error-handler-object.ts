import { ErrorHandlerTypeEnum } from './enums/error-handler-type.enum';
import { ErrorHandlerActionEnum } from './enums/error-handler-action.enum';

/**
 * Standard error
 */
export class ErrorHandlerObject {
  /**
   * Define action after error
   */
  public enumErrorHandlerActionEnum: ErrorHandlerActionEnum;

  /**
   * Define error type
   */
  public enumErrorHandlerTypeEnum: ErrorHandlerTypeEnum;

  /**
   * Default error
   */
  public error: Error;

  /**
   * Define interface title
   */
  public tilte: string;

  /**
   * Define interface message
   */
  public message: string;

  /**
   * In true case, kill the application connection
   */
  public isConnectionKiller: Boolean;
}

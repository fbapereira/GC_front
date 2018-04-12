/**
 * Decide the action after error
 */
export enum ErrorHandlerActionEnum {
    RESTART_SESSION = 0,
    TRY_AGAIN = 1,
    CLOSE_TAB = 2,
}

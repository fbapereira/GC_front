import { HttpRequest, HttpResponse } from '@angular/common/http';

/**
 * Interceptor main namespace
 */
export namespace Interceptor {
  /**
   * interceptor for requests
   */
  export abstract class Request {
    abstract treat(oHttpRequest: HttpRequest<any>): HttpRequest<any>;

    public createHttpRequest(oHttpRequest: HttpRequest<any>, url: string, body: any): HttpRequest<any> {
      if (oHttpRequest.method === 'POST') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          oHttpRequest.body,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      } else if (oHttpRequest.method === 'GET') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      }
    }
  }

  /**
   * Interceptor for responses
   */
  export abstract class Response {
    abstract treat(response: HttpResponse<any>): HttpResponse<any>;

    public createHttpRequest(oHttpRequest: HttpRequest<any>, url: string, body: any): HttpRequest<any> {
      if (oHttpRequest.method === 'POST') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          oHttpRequest.body,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      } else if (oHttpRequest.method === 'GET') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      }
    }
  }

  /**
   * Interceptor for fails
   */
  export abstract class Fail {
    abstract treat(err: HttpResponse<any>): HttpResponse<any>;

    public createHttpRequest(oHttpRequest: HttpRequest<any>, url: string, body: any): HttpRequest<any> {
      if (oHttpRequest.method === 'POST') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          oHttpRequest.body,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      } else if (oHttpRequest.method === 'GET') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          {
            'headers': oHttpRequest.headers,
            'reportProgress': oHttpRequest.reportProgress,
            'params': oHttpRequest.params,
            'responseType': oHttpRequest.responseType,
            'withCredentials': oHttpRequest.withCredentials
          });
      }
    }
  }
}


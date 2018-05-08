import { HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injector } from '@angular/core';

/**
 * Interceptor main namespace
 */
export namespace Interceptor {
  /**
   * interceptor for requests
   */
  export abstract class Request {
    abstract treat(oHttpRequest: HttpRequest<any>, injector: Injector): HttpRequest<any>;

    public createHttpRequest(oHttpRequest: HttpRequest<any>, url: string, body: any, token?: string): HttpRequest<any> {
      let oHeader: HttpHeaders = new HttpHeaders();
      // oHeader = oHeader.set("Authorization", "bearer  h5gl_TGwh0lDFKobd562ST_shE1qE5uhT53NozVXApm0d5p7Iaon5vQ8u0Xo-vlKe00SVWeOnDPZKjQBEQMgD_9pNICzTDBse3CIzTnMbFaMI0m8cjNtum1zVIbUGiX5vByuVIM2slwZZ0FfZxjfK7IbVc5Gwo5PxLQqrcVHr-DZqmzt_BVv5h9YpZ1JTvTJgOneJAyotp7H62rgI0Cy3kpJVOpNu03KHkkuvyXQ2VE");

      if (oHttpRequest.method === 'POST') {
        return new HttpRequest(
          oHttpRequest.method,
          url,
          oHttpRequest.body,
          {
            'headers': oHeader,
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
            'headers': oHeader,
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
    abstract treat(response: HttpResponse<any>, injector: Injector): HttpResponse<any>;

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
    abstract treat(err: HttpResponse<any>, injector: Injector): HttpResponse<any>;

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


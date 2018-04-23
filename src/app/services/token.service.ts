import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenService {

  oToken: string;

  constructor(private oHttpClient: HttpClient) { }


  public Auth(username: string, password: string): Observable<Boolean> {
    let body = new URLSearchParams();
    body.set('client_id', username);
    body.set('client_secret', password);
    body.set('grant_type', 'client_credentials');


    var options: any = {
      headers: new Headers({
        'Content-Type': 'x-www-form-urlencoded'
      })
    };

    return this.oHttpClient.post('Token', body, options)
      .map((value: any) => {
        this.oToken = value.access_token;
        return true;
      });


  }
}

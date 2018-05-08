import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenService {

  oToken: string;

  constructor(private oHttpClient: HttpClient) { }


  public Auth(username: string, password: string): Observable<Boolean> {
    let body = 'client_id=' + username + '&client_secret=' + password + '&grant_type=client_credentials';

    return this.oHttpClient.post('Token', body)
      .map((value: any) => {
        this.oToken = value.access_token;
        return true;
      });


  }
}

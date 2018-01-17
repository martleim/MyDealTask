/* tslint:disable:max-line-length */
/**
 * v1
 * AJI.API
 * localhost:53421undefined
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  /** http://localhost:53421undefined/swagger-ui.html#!/Authenticate/Authenticate_Login */
  login(): Observable<object> {
    return this.http.post<object>(`/Authenticate/Login`);
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Authenticate/Authenticate_Logout */
  logout(): Observable<object> {
    return this.http.post<object>(`/Authenticate/Logout`);
  }
}

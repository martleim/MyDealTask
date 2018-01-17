/* tslint:disable:max-line-length */
/**
 * v1
 * AJI.API
 * localhost:53421undefined
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface SubmitParams {
  /** Upload xml file */
  XML: File;
}

@Injectable()
export class ApplicationService {
  constructor(private http: HttpClient) {}

  /** http://localhost:53421undefined/swagger-ui.html#!/Application/Application_Post */
  submit(params: SubmitParams): Observable<object> {
    const formDataParams = {
      XML: params.XML,
    };
    return this.http.post<object>(`/Application/Submit`, formDataParams);
  }
}

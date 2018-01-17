/* tslint:disable:max-line-length */
/**
 * v1
 * AJI.API
 * localhost:53421undefined
 */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as model from '../model';

export interface Element_PutParams {
  /** format: int32 */
  id: number;
  e: model.Element;
}

export interface Element_DeleteParams {
  /** format: int32 */
  id: number;
}

export interface Element_GetParams {
  /** format: int32 */
  id?: number;
}

export interface Element_PostParams {
  e: model.Element;
}

@Injectable()
export class ElementService {
  constructor(private http: HttpClient) {}

  /** http://localhost:53421undefined/swagger-ui.html#!/Element/Element_Put */
  Element_Put(params: Element_PutParams): Observable<object> {
    const pathParams = {
      id: params.id,
    };
    const bodyParams = params.e;
    return this.http.put<object>(`/Element/${pathParams.id}`, bodyParams);
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Element/Element_Delete */
  Element_Delete(params: Element_DeleteParams): Observable<object> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete<object>(`/Element/${pathParams.id}`);
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Element/Element_Get */
  Element_Get(params: Element_GetParams): Observable<object> {
    const queryParamBase = {
      id: params.id,
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === 'string') queryParams = queryParams.set(key, value);
        else queryParams = queryParams.set(key, JSON.stringify(value));
      }
    });

    return this.http.get<object>(`/Element`, {params: queryParams});
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Element/Element_Post */
  Element_Post(params: Element_PostParams): Observable<object> {
    const bodyParams = params.e;
    return this.http.post<object>(`/Element`, bodyParams);
  }
}

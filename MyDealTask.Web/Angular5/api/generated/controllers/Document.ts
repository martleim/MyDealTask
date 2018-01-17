/* tslint:disable:max-line-length */
/**
 * v1
 * AJI.API
 * localhost:53421undefined
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

export interface Document_PostParams {
  applicationId: string;
  documentCategory: string;
  documentType: string;
  /** Upload pdf file */
  PDF: File;
}

export interface LegacyParams {
  applicationId: string;
  /** Upload pdf file */
  PDF: File;
}

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {}

  /** http://localhost:53421undefined/swagger-ui.html#!/Document/Document_Get */
  Document_Get(): Observable<object> {
    return this.http.get<object>(`/Document`);
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Document/Document_Post */
  Document_Post(params: Document_PostParams): Observable<object> {
    const pathParams = {
      applicationId: params.applicationId,
      documentCategory: params.documentCategory,
      documentType: params.documentType,
    };
    const formDataParams = {
      PDF: params.PDF,
    };
    return this.http.post<object>(`/Document/${pathParams.applicationId}/${pathParams.documentCategory}/${pathParams.documentType}`, formDataParams);
  }

  /** http://localhost:53421undefined/swagger-ui.html#!/Document/Document_PostLegacy */
  legacy(params: LegacyParams): Observable<object> {
    const pathParams = {
      applicationId: params.applicationId,
    };
    const formDataParams = {
      PDF: params.PDF,
    };
    return this.http.post<object>(`/Document/Legacy/${pathParams.applicationId}`, formDataParams);
  }
}

import 'rxjs/add/operator/map';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpClient, HttpEvent } from '@angular/common/http';

import { Configuration } from '../../app.constants';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

    private _actionUrl: string;

    public elementName: string = "values"

    public get actionUrl():string {
        return this._actionUrl + this.elementName + "/";
    }

    constructor(private http: HttpClient, private _configuration: Configuration) {
        this._actionUrl = _configuration.ServerWithApiUrl;
    }

    public getAll<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl);
    }

    public getSingle<T>(id: number): Observable<T> {
        return this.http.get<T>(this.actionUrl + id);
    }

    public add<T>(item: any): Observable<T> {
        const toAdd = JSON.stringify(item);

        return this.http.post<T>(this.actionUrl, toAdd);
    }

    public update<T>(id: number, itemToUpdate: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + id, itemToUpdate);
    }

    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id);
    }

}

/**
 * Include angular2 dependencies including HTTP dependencies
 * and Injectable and Inject
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, ResponseContentType } from '@angular/http';

/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from './../store';


import { ERROR, Layout_H_Change, Layout_V_Change } from '../actions';

@Injectable()
export class RequestService {

    http: Http;
    //Inject the store to make sure state changes go through the store
    constructor(public store: Store<AppState>, http: Http) {
        this.http = http;
    }

    request(method: string | number = RequestMethod.Get, url: string, headers: Headers, data: any, files?: [{ file: File, name: string }], isMuti?: boolean, responseType: ResponseContentType = ResponseContentType.Json) {
        if (isMuti && files.length > 0) {
            let formData: FormData = new FormData();
            for (let i = 0, len = files.length; i < len; i++) {
                formData.append(files[i].name, files[i].file, files[i].file.name);
            }
            if (data !== "" && data !== undefined && data !== null) {
                for (let property in data) {
                    if (data.hasOwnProperty(property)) {
                        formData.append(property, data[property]);
                    }
                }
            }
            data = formData;
        }
        return this.http.request(new Request({
            method: method,
            url: url,
            headers: headers,
            body: data,
            //setting ensure sending cookie to server
            withCredentials: true,
            responseType: responseType
        }));
    }

}

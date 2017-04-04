import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from './../store';
import { FormDataBase } from '../components/form-item/form.base';

import {
    ADD_HEADER_FORMDATA,
    DELETE_HEADER_FORMDATA,
    UPDATE_HEADER_FORMDATA,
    UPDATE_HEADER_CHECK_STATUS,
    ADD_BODY_FORMDATA,
    DELETE_BODY_FORMDATA,
    UPDATE_BODY_FORMDATA,
    UPDATE_BODY_CHECK_STATUS,
    UPDATE_BODY_TYPE,
    UPDATE_BODY_RAWDATA,
    UPDATE_RESPONSE_DATA
} from '../actions';


@Injectable()
export class FromDataControlService {
    constructor(public store: Store<AppState>) {
    }
    headerFormData: any;
    bodyFormData: any;
    bodyRawData: any;

    toFormGroup(formdatas: any) {
        let group: any = {};

        formdatas.forEach(rows => {
            rows.row.forEach(formdata => {
                group[formdata.key] = formdata.required ? new FormControl(formdata.value || '', Validators.required)
                    : new FormControl(formdata.value || '');
            })
        });
        return new FormGroup(group);
    }



    updateHeaderFormData(payload: any) {
        this.headerFormData = payload;

    }

    updateBodyFormData(payload: any) {
        this.bodyFormData = payload;

    }
    updateBeforeOperate() {
        if (this.bodyFormData) {
            this.store.dispatch({
                type: UPDATE_BODY_FORMDATA,
                payload: {
                    payload: this.bodyFormData
                }
            })
        }

        if (this.headerFormData) {
            this.store.dispatch({
                type: UPDATE_HEADER_FORMDATA,
                payload: {
                    payload: this.headerFormData
                }
            })
        }
        if (this.bodyRawData) {
            this.store.dispatch({
                type: UPDATE_BODY_RAWDATA,
                payload: {
                    payload: this.bodyRawData
                }
            })
        }
    }
    updateHeaderFormDataCheckStatus(payload: any) {
        this.updateBeforeOperate();
        this.store.dispatch({
            type: UPDATE_HEADER_CHECK_STATUS,
            payload: {
                payload: payload
            }
        })
    }
    updateBodyFormDataCheckStatus(payload: any) {
        this.updateBeforeOperate();

        this.store.dispatch({
            type: UPDATE_BODY_CHECK_STATUS,
            payload: {
                payload: payload
            }
        })
    }
    addBodyFormData(payload: any) {
        this.updateBeforeOperate();


        this.store.dispatch({
            type: ADD_BODY_FORMDATA,
            payload: {}
        })
    }
    addHeaderFormData(payload: any) {
        this.updateBeforeOperate();

        this.store.dispatch({
            type: ADD_HEADER_FORMDATA,
            payload: {}
        })
    }
    removeBodyFormData(index: number) {
        this.updateBeforeOperate();

        this.store.dispatch({
            type: DELETE_BODY_FORMDATA,
            payload: {
                index: index
            }
        })
    }
    removeHeaderFormData(index: number) {
        this.updateBeforeOperate();

        this.store.dispatch({
            type: DELETE_HEADER_FORMDATA,
            payload: {
                index: index
            }
        })
    }
    updateBodyType(type: string) {
        this.store.dispatch({
            type: UPDATE_BODY_TYPE,
            payload: {
                payload: type
            }
        })
    }
    updateBodyRawData(payload: string) {
        this.bodyRawData = payload;
    }


    updateResponseData(payload: any) {

        this.store.dispatch({
            type: UPDATE_RESPONSE_DATA,
            payload: {
                payload: payload
            }
        })
    }
}
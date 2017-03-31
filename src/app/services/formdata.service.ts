import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from './../store';
import { FormDataBase } from '../components/form-item/form.base';

import {
    ADD_HEADER_FORMDATA,
    DELETE_HEADER_FORMDATA,
    UPDATE_HEADER_FORMDATA,
    UPDATE_HEADER_CHECK_STATUS
} from '../actions';


@Injectable()
export class FromDataControlService {
    constructor(public store: Store<AppState>) {
    }

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

    addHeaderFormData() {
        this.store.dispatch({
            type: ADD_HEADER_FORMDATA,
            payload: {}
        })
    }
    removeHeaderFormData(index: number) {
        this.store.dispatch({
            type: DELETE_HEADER_FORMDATA,
            payload: {
                index: index
            }
        })
    }
    updateHeaderFormData(payload: any) {
        this.store.dispatch({
            type: UPDATE_HEADER_FORMDATA,
            payload: {
                payload: payload
            }
        })
    }
    updateHeaderFormDataCheckStatus(payload: any) {
        this.store.dispatch({
            type: UPDATE_HEADER_CHECK_STATUS,
            payload: {
                payload: payload
            }
        })
    }

}
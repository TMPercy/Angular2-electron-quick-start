/**
 * Include angular2 dependencies including HTTP dependencies
 * and Injectable and Inject
 */
import { Injectable } from '@angular/core';

/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from './../store';

import { View_Content_Loadded } from '../actions';

@Injectable()
export class LoadService {

    //Inject the store to make sure state changes go through the store
    constructor(public store: Store<AppState>) {
    }

    setAppReady() {
        this.store.dispatch({
            type: View_Content_Loadded,
            payload: {
                value: true
            }
        })
    }

}

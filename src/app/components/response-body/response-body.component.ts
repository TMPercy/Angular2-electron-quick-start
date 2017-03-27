/**
 * Import decorators and services from angular
 */
import { Component, OnInit } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


// Allow us to use Notification API here.
declare var Notification: any;

@Component({
    selector: 'eo-response-body',
    templateUrl: './response-body.component.html',
    styleUrls: ['./response-body.component.scss'],
})
export class ResponseBodyComponent implements OnInit {
    name: string;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {

    }

}
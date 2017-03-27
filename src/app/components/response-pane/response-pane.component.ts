/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


// Allow us to use Notification API here.
declare var Notification: any;

@Component({
    selector: 'eo-response-pane',
    templateUrl: './response-pane.component.html',
    styleUrls: ['./response-pane.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ResponsePaneComponent implements OnInit {
    name: string;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {

    }

}

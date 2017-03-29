/**
 * Import decorators and services from angular
 */
import { Component, OnInit, Input } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


// Allow us to use Notification API here.
declare var Notification: any;

@Component({
    selector: 'eo-response-header',
    templateUrl: './response-header.component.html',
    styleUrls: ['./response-header.component.scss'],
})
export class ResponseHeaderComponent implements OnInit {
    @Input() formData: any;
    name: string;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {

    }

}

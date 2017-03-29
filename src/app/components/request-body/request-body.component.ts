/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


// Allow us to use Notification API here.
declare var Notification: any;

@Component({
    selector: 'eo-request-body',
    templateUrl: './request-body.component.html',
    styleUrls: ['./request-body.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RequestBodyComponent implements OnInit {
    @Input() formData: any;

    name: string;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {

    }

}

/**
 * Import decorators and services from angular
 */
import { Component, OnInit, Input } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


@Component({
    selector: 'eo-request-header',
    templateUrl: './request-header.component.html',
    styleUrls: ['./request-header.component.scss'],
})
export class RequestHeaderComponent implements OnInit {
    @Input() formData: any;
    name: string;

    constructor(public store: Store<AppState>) {
    }

    ngOnInit() {

    }

}

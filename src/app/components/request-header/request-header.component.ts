/**
 * Import decorators and services from angular
 */
import { Component, OnInit, Input } from '@angular/core';

import { FromDataControlService } from '../../services/formdata.service';
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
    timer: any = null;

    constructor(public store: Store<AppState>, private fds: FromDataControlService) {
    }

    ngOnInit() {

    }
    onHeadlerFormSelect($event) {
        console.log('select', $event)
    }
    onHeadlerFormDelete($event) {
        this.fds.removeHeaderFormData($event);
    }
    addFormData() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.fds.addHeaderFormData();
        }, 100)
    }
    updateFormData($event) {
        console.log('update', $event)
        this.fds.updateHeaderFormData($event);
    }
}

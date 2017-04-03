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
    formdatas: any;

    constructor(public store: Store<AppState>, private fds: FromDataControlService) {
    }

    ngOnInit() {

    }
    onHeadlerFormSelect($event) {

        this.fds.updateHeaderFormDataCheckStatus($event);
    }
    onHeadlerFormDelete($event) {
        this.fds.removeHeaderFormData($event);
    }
    addFormData() {

        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.fds.addHeaderFormData(this.formdatas);
        }, 100)
    }
    updateFormData($event) {
        this.formdatas = $event;
        this.fds.updateHeaderFormData($event);
    }

}

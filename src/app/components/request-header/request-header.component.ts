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
    updateSign: boolean = false;

    constructor(public store: Store<AppState>, private fds: FromDataControlService) {
    }

    ngOnInit() {

    }
    onHeadlerFormSelect($event) {
        //update formdata before select a  item.
        this.updateHeaderFormData();

        this.fds.updateHeaderFormDataCheckStatus($event);
    }
    onHeadlerFormDelete($event) {
        //update formdata before delete a  item.
        this.updateHeaderFormData();
        this.fds.removeHeaderFormData($event);
    }
    addFormData() {
        //update formdata before adding a new item.
        this.updateHeaderFormData();

        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.fds.addHeaderFormData(this.formdatas);
        }, 100)
    }
    updateFormData($event) {
        this.updateSign = true;
        this.formdatas = $event;
        // this.fds.updateHeaderFormData($event);
    }

    updateHeaderFormData() {
        if (this.updateSign) {
            this.fds.updateHeaderFormData(this.formdatas)
            this.updateSign = false;
        }
    }
}

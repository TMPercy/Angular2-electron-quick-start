/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation, Input, NgZone } from '@angular/core';

import { FromDataControlService } from '../../services/formdata.service';

import { Tools } from '../../lib/util';

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

    timer: any = null;

    formdatas: any;

    constructor(public store: Store<AppState>, private fds: FromDataControlService, private zone: NgZone) {
    }

    ngOnInit() {
    }
    ngOnChanges(changes) {
    }
    onHeadlerFormSelect($event) {


        this.fds.updateBodyFormDataCheckStatus($event);
    }
    onHeadlerFormDelete($event) {


        this.fds.removeBodyFormData($event);
    }
    addFormData() {

        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.fds.addBodyFormData(this.formdatas);
        }, 100)
    }
    updateFormData($event) {
        this.formdatas = $event;
        console.log($event)
        this.fds.updateBodyFormData(this.formdatas)

    }

}

/**
 * Import decorators and services from angular
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestMethod, Headers } from '@angular/http';

/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../../store';


import { ActionItem } from '../../ui-components/action-button/action-item.model';

import { LayoutService } from '../../services/layout.service';
import { LoadService } from '../../services/loader.service';
import { RequestService } from '../../services/request.service';
import { FromDataControlService } from '../../services/formdata.service';
import { Tools } from '../../lib/util';

// Allow us to use Notification API here.
declare var Notification: any;
interface dragData {
    direction: string,
    diff: number,
    value: number
}

@Component({
    selector: 'eo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(public store: Store<AppState>, private layout: LayoutService, private loader: LoadService, private res: RequestService, private fds: FromDataControlService) {
        this.layout = layout;
        this.loader = loader;
        this.res = res;
    }

    name: string;
    defaultMethod: ActionItem = { id: 0, text: 'GET' }
    methods: ActionItem[] = [
        {
            id: RequestMethod.Get,
            text: 'GET',
        }, {
            id: RequestMethod.Post,
            text: 'POST',
        }, {
            id: RequestMethod.Put,
            text: 'PUT',
        }, {
            id: RequestMethod.Delete,
            text: 'DELETE',
        }, {
            id: RequestMethod.Head,
            text: 'HEAD',
        }, {
            id: RequestMethod.Options,
            text: 'OPTIONS',
        }];
    defaultProtocol: ActionItem = { id: 0, text: 'HTTP' };
    protocols: ActionItem = [{
        id: 0,
        text: 'HTTP',
    }, {
        id: 1,
        text: 'HTTPS',
    }];
    url: string;


    draggingSign: boolean = false;
    draggingDiff: number;
    draggingDirection: string;
    //layout data
    appStore: AppState;

    //enable send request
    enableSend: boolean = false;



    ngOnInit() {
        let state = this.store.select('AppStore').subscribe((state: any) => {
            this.appStore = Tools.transformPositon(state);
            console.log(this.appStore)
        });
    }
    ngAfterViewInit() {
        //when app is ready,remove loading
        this.loader.setAppReady();
    }

    onMethodClick(item: ActionItem) {
        this.defaultMethod = item;
    }
    onProtocolClick(item: ActionItem) {
        this.defaultProtocol = item;
    }
    onDragPaneResize(data: dragData) {
        this.draggingSign = true;
        this.draggingDiff = data.diff;
        this.draggingDirection = data.direction;
        this.layout.calculatePosition(data.direction, data.value, this.draggingDiff)
    }
    onDragPaneMouseMove($event?: MouseEvent) {
        // $event.preventDefault();
        if (!this.draggingSign) {
            return;
        }
        //release MouseEvent
        if ($event.clientX < 10 || $event.clientX > window.innerWidth - 10 || $event.clientY < 50 || $event.clientY > window.innerHeight - 10) {
            this.draggingSign = false;
            return;
        }

        if (this.draggingDirection == 'v') {
            if (window.innerHeight - $event.clientY - this.draggingDiff >= 790) {
                return;
            } else {
                this.layout.calculatePosition(this.draggingDirection, window.innerHeight - $event.clientY - this.draggingDiff, this.draggingDiff)
            }

        }
        else {
            if ($event.clientX - this.draggingDiff >= 960) {
                return;
            } else {
                this.layout.calculatePosition(this.draggingDirection, $event.clientX - this.draggingDiff, this.draggingDiff)
            }
        }
    }
    onDragPaneMouseUp($event?: MouseEvent) {
        $event.preventDefault();
        this.draggingSign = false;
    }

    onProtocolEmit(protocol?: string) {
        if (protocol) {
            let p = protocol.toUpperCase();

            this.defaultProtocol = p == 'HTTP' ? this.protocols[0] : this.protocols[1];
        }
    }

    onEnableSend(sign?: boolean) {
        this.enableSend = sign;
    }
    onUrlChange(url?: string) {
        if (url) {
            this.url = url;
        }
    }
    onSendingRequest() {
        let headers: Headers;
        let data: any;
        let url = this.defaultProtocol.text.toLocaleLowerCase() + '://' + this.url;
        let method = this.defaultMethod.id;
        let customerHeader: any;
        let files: any;
        let isMuti: boolean;
        //update formdate before formate
        this.fds.updateBeforeOperate();

        if (!this.url) {
            return;
        }


        isMuti = this.appStore.isMutipartForm;

        headers = new Headers();
        headers.append('Accept', 'application/json');
        customerHeader = Tools.formatHeaderData(this.appStore.headerFormDatas);
        for (let property in customerHeader) {
            if (customerHeader.hasOwnProperty(property) && Tools.varifyHeader(property)) {
                if (property == 'Content-Type' && isMuti) {
                    continue;
                }
                headers.append(property, customerHeader[property]);
            }
        }
        if (!isMuti && this.appStore.bodyFormType == 'raw') {
            data = Tools.parseRaw(this.appStore.bodyRawData);
        }
        else if (isMuti && this.appStore.bodyFormType == 'form') {
            let body = Tools.formatBodyFormData(this.appStore.bodyFormDatas);
            data = body.postdata;
            files = body.files;
        } else {
            data = Tools.formatBodyData(this.appStore.bodyFormDatas);
        }
        this.res.request(method, url, headers, data, files, isMuti).subscribe(
            (response: any) => {
                //call the store to update the authToken
                console.log(response)
                let status = { code: response.status, text: response.statusText };
                let body = response._body;
                let headers = response.headers.toJSON();

                this.fds.updateResponseData({
                    status: status,
                    body: body,
                    headers: headers
                })
            },
            (response: any) => {
                //call the store to update the authToken
                console.log(response)
                let status = { code: response.status, text: response.statusText };
                let body = response._body;
                let headers = response.headers.toJSON();

                this.fds.updateResponseData({
                    status: status,
                    body: body,
                    headers: headers
                })
            },
            () => console.log('Authentication Complete')
        )
    }

}
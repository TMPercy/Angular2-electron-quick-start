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
    @Input() value: any;
    name: string;
    headers: any = [];

    constructor(public store: Store<AppState>) { }

    ngOnInit() {
        let item = {};
        let result = [];
        for (let i in this.value) {
            if (this.value.hasOwnProperty(i)) {
                item['name'] = i;
                item['value'] = this.value[i][0];
                result.push(item);
            }
        }
        this.headers = result;
    }
    ngOnChanges(changes): void {
        let item = {};
        let result = [];
        console.log(changes, 'changes')
        for (let i in changes.value.currentValue) {
            if (changes.value.currentValue.hasOwnProperty(i)) {
                item['name'] = i;
                item['value'] = changes.value.currentValue[i][0];
                result.push(item);
            }
        }
        this.headers = result;
        console.log(this.headers)
    }

}

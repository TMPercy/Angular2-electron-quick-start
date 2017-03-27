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
    selector: 'eo-pane',
    templateUrl: './pane.component.html',
    styleUrls: ['./pane.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaneComponent implements OnInit {
    @Input() title: string;
    name: string;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {

    }

}

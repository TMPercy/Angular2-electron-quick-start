/**
 * Import decorators and services from angular
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
/**
 * Import the ngrx configured store
 */
import { Store } from '@ngrx/store';
import { AppState } from '../store';

import { Tools } from '../lib/util';

/*
 * App Component
 * Top Level Component
 */
@Component({
    // The selector is what angular internally uses
    selector: 'eo-app', // <app></app>
    styleUrls: ['./app.theme.scss'],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div>
        <eo-preloader type="circles" [show]="appStore.viewContentLoaded"></eo-preloader>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent implements OnInit {

    appStore: any;

    constructor(public store: Store<AppState>) {
    }

    ngOnInit() {
        let state = this.store.select('AppStore').subscribe((state: any) => {
            this.appStore = Tools.transformPositon(state);
        });
    }

}

import { Inject, Injectable, LOCALE_ID, ViewContainerRef } from '@angular/core';

@Injectable()
export class UIComponentConfig {

    tabs = {
        type: 'tabs', // 'tabs' | 'pills'
        justified: false,
        vertical: false
    };

    constructor( @Inject(LOCALE_ID) private locale: string) {
    }

    extend(obj: any): this {
        Object.assign(this, obj);
        return this;
    }
}

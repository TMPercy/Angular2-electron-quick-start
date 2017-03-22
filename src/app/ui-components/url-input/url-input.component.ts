import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'eo-url-input',
    templateUrl: './url-input.component.html',
    // styleUrls: ['url-input.component.scss']
})
export class UrlInputComponent {

    @Input() type: string;
    @Output() protocolEmit = new EventEmitter<string>();


    value: string = '';
    timer: any;

    constructor(el: ElementRef) {
        //    el.nativeElement.style.backgroundColor = 'yellow';
    }

    ngOnInit() {

    }
    urlRedress($event, value) {
        let urlReg = /^(http|https):\/\//;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            let r = urlReg.exec($event.target.value);
            if (r) {
                this.value = this.value.replace(urlReg, '');
                this.protocolEmit.emit(r[1]);
            }
        }, 100)

    }

    ngOnChanges(changeRecord) {

    }
}

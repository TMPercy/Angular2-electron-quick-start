import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'eo-url-input',
    templateUrl: './url-input.component.html',
    // styleUrls: ['url-input.component.scss']
})
export class UrlInputComponent {

    @Input() type: string;
    @Input() defaultValue: string;
    @Output() urlChange = new EventEmitter<string>();
    @Output() enableSend = new EventEmitter<boolean>();
    @Output() protocolEmit = new EventEmitter<string>();

    timer: any;
    value: string;

    constructor(el: ElementRef) {
        //    el.nativeElement.style.backgroundColor = 'yellow';
    }

    ngOnInit() {
        this.value = this.defaultValue;
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
            if (this.value != "") {
                this.enableSend.emit(true)
            }
            else {
                this.enableSend.emit(false)
            }
            if (this.value !== this.defaultValue) {
                this.urlChange.emit(this.value);
            }
        }, 100)

    }

    ngOnChanges(changeRecord) {

    }


}

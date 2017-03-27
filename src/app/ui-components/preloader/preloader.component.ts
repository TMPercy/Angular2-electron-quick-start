import { Component, OnInit, Input, Output, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'eo-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['preloader.component.scss']
})
export class PreloaderComponent {

    @Input() type: string;
    @Input() show: boolean;


    loadinText: string = 'loading...';
    timer: any = null;
    constructor(el: ElementRef) {
        //    el.nativeElement.style.backgroundColor = 'yellow';
    }
    ngOnInit() {
        this.timer = setInterval(() => {
            let len = this.loadinText.length;
            if (len > 7) {
                this.loadinText = this.loadinText.slice(0, len - 1);
            } else {
                this.loadinText = 'loading...';
            }
            // console.log(this.loadinText)
        }, 500)
    }
    //
    ngOnChanges(changeRecord) {
        if (changeRecord.show.currentValue) {
            clearInterval(this.timer);
        }
    }
}

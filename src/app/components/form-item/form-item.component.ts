import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDataBase } from './form.base';


@Component({
    selector: 'eo-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormItemComponent {
    @Input() items: any;
    @Input() form: FormGroup;
    @Input() index: number;
    @Output() deleteHandler = new EventEmitter<number>();
    @Output() selectHandler = new EventEmitter<any>();
    @Output() changeHandler = new EventEmitter<boolean>();

    checked: boolean = true;
    timer: any = null;
    file: FileList;

    ngOnInit() {
    }
    // get isValid() { return this.form.controls[this.item.key].valid; }

    onSelectButtonClick(index: number) {
        this.checked = !this.checked;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.selectHandler.emit({ index: index, checked: this.checked });
        }, 200)
    }
    onDeleteButtonClick(index: number) {
        this.deleteHandler.emit(index);
    }
    onModelChange() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.changeHandler.emit(true);
        }, 200)
    }
    onSelectChange($event) {
        if ($event.target.value == 'text') {
            setTimeout(() => { this.form.setValue({ ...this.form.value, value: '' }) }, 0)
        }
    }
    onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        this.file = files;
        this.form.setValue({ ...this.form.value, value: this.file })
        // this.items.row[2].value = this.file;
        this.onModelChange();
    }
}
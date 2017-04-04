import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDataBase } from './form.base';
import { Tools } from '../../lib/util';

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
    file: File;
    reader: FileReader = new FileReader();
    filekey: string;

    ngOnInit() {
        this.reader.onload = (event: any) => {
            let base64 = event.target.result;
            let obj = {};
            console.log(Tools.generateSign(), 7897897)
            obj[this.filekey] = this.file.name + '(' + this.file.type + ')' + Tools.generateSign() + base64;
            this.form.setValue({ ...this.form.value, ...obj });
            this.onModelChange();
        }
    }
    // get isValid() { return this.form.controls[this.item.key].valid; }
    ngOnChanges(changes) {
        this.checked = changes.items.currentValue.checked;
        if (changes.items.currentValue.row.length > 2 && changes.items.currentValue.row[2].value.length > 100) {
            this.file = changes.items.currentValue.row[2].value;
        }
    }
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
            if (this.filekey) {
                let obj = {};
                obj[this.filekey] = '';
                this.file = null;
                this.form.setValue({ ...this.form.value, ...obj })

            }



        }
        this.onModelChange();
    }
    onChange(event: EventTarget, items) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        let obj = {};
        this.filekey = items.key;
        this.file = files.length > 0 ? files[0] : null;
        if (this.file) {
            this.reader.readAsDataURL(this.file)
        } else {
            this.filekey = '';
            obj[items.key] = '';
            this.form.setValue({ ...this.form.value, ...obj })
        }
        this.onModelChange();

    }
}
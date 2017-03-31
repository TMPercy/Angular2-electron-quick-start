import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDataBase } from '../form-item/form.base';
import { FromDataControlService } from '../../services/formdata.service';

import { Tools } from '../../lib/util';

@Component({
    selector: 'eo-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class FormComponent implements OnInit {

    @Input() items: {
        row: FormDataBase<any>[][],
        checked: boolean
    };
    @Input() type: string;
    @Output() emitItemDelete = new EventEmitter<number>();
    @Output() emitItemSelect = new EventEmitter<any>();
    @Output() emitItemChange = new EventEmitter<any>();


    form: FormGroup;
    payLoad = '';

    constructor(private fds: FromDataControlService) {

    }

    ngOnInit() {
        this.form = this.fds.toFormGroup(this.items);
    }
    ngOnChanges(changes): void {
        this.form = this.fds.toFormGroup(changes.items.currentValue);
    }

    onEmitItemSelect($event) {
        this.emitItemSelect.emit($event);
    }
    onEmitItemDelete($event) {
        this.emitItemDelete.emit($event);
    }
    onEmitItemChange($event) {
        if ($event) {
            if (this.type == 'header') {
                this.emitItemChange.emit((this.form.value))
            } else {
                this.emitItemChange.emit((this.form.value))
            }
        }
    }
}

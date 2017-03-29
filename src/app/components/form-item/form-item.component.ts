import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDataBase } from './form.base';

@Component({
    selector: 'eo-form-item',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent {
    @Input() items: FormDataBase<any>;
    @Input() form: FormGroup;


    ngOnInit() {
        console.log(this.items, 999)
    }
    // get isValid() { return this.form.controls[this.item.key].valid; }
}
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormDataBase } from '../components/form-item/form.base';

@Injectable()
export class FromDataControlService {
    constructor() { }

    toFormGroup(formdatas: FormDataBase<any>[][]) {
        let group: any = {};

        formdatas.forEach(row => {
            row.forEach(formdata => {
                group[formdata.key] = formdata.required ? new FormControl(formdata.value || '', Validators.required)
                    : new FormControl(formdata.value || '');
            })
        });
        return new FormGroup(group);
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormDataBase } from '../form-item/form.base';
import { FromDataControlService } from '../../services/formdata.service';

@Component({
    selector: 'eo-form',
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    @Input() items: FormDataBase<any>[][];
    form: FormGroup;
    payLoad = '';

    constructor(private qcs: FromDataControlService) {

    }

    ngOnInit() {
        this.form = this.qcs.toFormGroup(this.items);
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.value);
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
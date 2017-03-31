
import { Pipe, PipeTransform } from '@angular/core';

import { Tools } from '../../lib/util';


@Pipe({ name: 'transformFormValue' })
export class transformFormValuePipe implements PipeTransform {
    transform(value: any): string {

        return typeof value == 'string' || !value ? this.sliceValue(value) || '' : this.transformFileName(value);
    }
    sliceValue(str: string) {
        let sign = Tools.generateSign();
        let i = str && str.split(sign)[0];
        return i;
    }
    transformFileName(files: File) {
        let result = files.name + '(' + files.type + ')';

        return result;
    }
}
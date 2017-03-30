
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformFormValue' })
export class transformFormValuePipe implements PipeTransform {
    transform(value: any): string {
        return typeof value == 'string' || !value ? value || '' : this.transformFileName(value);
    }
    transformFileName(files: FileList) {
        let result = [];
        let len = files.length;
        for (let i = 0; i < len; i++) {
            result.push(files[i].name);
        }
        return result.join(',');
    }
}
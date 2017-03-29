import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'template[eoTabTitle]',
})
export class TabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}

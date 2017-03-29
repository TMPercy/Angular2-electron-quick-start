import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'template[eoTabContent]',
})
export class TabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}

import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'op-dynamic-field-group-wrapper',
  templateUrl: './dynamic-field-group-wrapper.component.html',
  styleUrls: ['./dynamic-field-group-wrapper.component.scss'],
  imports: [NgClass],
})
export class DynamicFieldGroupWrapperComponent extends FieldWrapper {
}

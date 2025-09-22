import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { projectStatusCodeCssClass } from 'core-app/shared/components/fields/helpers/project-status-helper';
import { NgSelectComponent, NgLabelTemplateDirective, NgOptionTemplateDirective } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'op-select-project-status-input',
  templateUrl: './select-project-status-input.component.html',
  imports: [
    NgSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    NgLabelTemplateDirective,
    NgClass,
    NgOptionTemplateDirective,
    AsyncPipe,
  ],
})
export class SelectProjectStatusInputComponent extends FieldType {
  cssClass(item:any) {
    return projectStatusCodeCssClass(item.id);
  }
}

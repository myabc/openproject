import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { FormattableControlComponent } from './components/formattable-control/formattable-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-formattable-textarea-input',
  templateUrl: './formattable-textarea-input.component.html',
  styleUrls: ['./formattable-textarea-input.component.scss'],
  imports: [
    FormattableControlComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class FormattableTextareaInputComponent extends FieldType {
}

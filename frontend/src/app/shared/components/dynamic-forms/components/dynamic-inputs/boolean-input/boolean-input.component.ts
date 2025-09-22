import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-boolean-input',
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class BooleanInputComponent extends FieldType {
}

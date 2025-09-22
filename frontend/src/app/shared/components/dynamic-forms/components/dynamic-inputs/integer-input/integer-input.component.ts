import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-integer-input',
  templateUrl: './integer-input.component.html',
  styleUrls: ['./integer-input.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class IntegerInputComponent extends FieldType {
}

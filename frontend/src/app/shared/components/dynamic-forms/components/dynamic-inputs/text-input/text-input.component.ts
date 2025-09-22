import { Component } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class TextInputComponent extends FieldType {
}

import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { OpBasicSingleDatePickerComponent } from '../../../../datepicker/basic-single-date-picker/basic-single-date-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-date-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  imports: [
    OpBasicSingleDatePickerComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class DateInputComponent extends FieldType {
  @HostBinding('class') get class() {
    return (this.model?.id === 'projects' && this.key.toString().startsWith('customField'))
      ? 'form--date-picker-container -xslim'
      : null;
  }
}

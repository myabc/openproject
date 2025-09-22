import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { FieldWrapper, FormlyModule } from '@ngx-formly/core';
import { DynamicFormComponent } from 'core-app/shared/components/dynamic-forms/components/dynamic-form/dynamic-form.component';
import { OpSpotModule } from '../../../../../spot/spot.module';
import { AttributeHelpTextComponent } from '../../../attribute-help-texts/attribute-help-text.component';

@Component({
  selector: 'op-dynamic-field-wrapper',
  templateUrl: './dynamic-field-wrapper.component.html',
  styleUrls: ['./dynamic-field-wrapper.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    OpSpotModule,
    AttributeHelpTextComponent,
    FormlyModule,
  ],
})
export class DynamicFieldWrapperComponent extends FieldWrapper {
  constructor(
    @Optional() public dynamicFormComponent:DynamicFormComponent,
  ) {
    super();
  }
}

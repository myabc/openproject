import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { ProjectAutocompleterComponent } from '../../../../autocompleter/project-autocompleter/project-autocompleter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-project-input',
  templateUrl: './project-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProjectAutocompleterComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class ProjectInputComponent extends FieldType {
}

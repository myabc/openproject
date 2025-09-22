import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { UserAutocompleterComponent } from '../../../../autocompleter/user-autocompleter/user-autocompleter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'op-user-input',
  templateUrl: './user-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserAutocompleterComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
  ],
})
export class UserInputComponent extends FieldType implements OnInit {
  projectId:string|undefined;

  public ngOnInit():void {
    this.projectId = this.model?.id;
  }
}

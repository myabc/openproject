import { Observable } from 'rxjs';
import { InjectField } from 'core-app/shared/helpers/angular/inject-field.decorator';
import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { PathHelperService } from 'core-app/core/path-helper/path-helper.service';
import {
  IUserAutocompleteItem,
  UserAutocompleterComponent,
} from 'core-app/shared/components/autocompleter/user-autocompleter/user-autocompleter.component';
import { URLParamsEncoder } from 'core-app/features/hal/services/url-params-encoder';
import { NgSelectComponent, NgHeaderTemplateDirective, NgLabelTemplateDirective, NgOptionTemplateDirective, NgFooterTemplateDirective } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgClass, NgTemplateOutlet, NgStyle, AsyncPipe } from '@angular/common';
import { NgOptionHighlightDirective } from '@ng-select/ng-option-highlight';
import { OpPrincipalComponent } from '../../principal/principal.component';

@Component({
  templateUrl: '../op-autocompleter/op-autocompleter.component.html',
  imports: [
    NgSelectComponent,
    FormsModule,
    NgClass,
    NgHeaderTemplateDirective,
    NgTemplateOutlet,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgFooterTemplateDirective,
    NgOptionHighlightDirective,
    NgStyle,
    OpPrincipalComponent,
    AsyncPipe,
  ],
})
export class MembersAutocompleterComponent extends UserAutocompleterComponent {
  @InjectField() pathHelper:PathHelperService;

  public getAvailableUsers(searchTerm:string):Observable<IUserAutocompleteItem[]> {
    return this
      .http
      .get<IUserAutocompleteItem[]>(
        this.url,
        {
          params: new HttpParams({ encoder: new URLParamsEncoder(), fromObject: { q: searchTerm } }),
          responseType: 'json',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        },
      );
  }
}

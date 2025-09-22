//-- copyright
// OpenProject is an open source project management software.
// Copyright (C) the OpenProject GmbH
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See COPYRIGHT and LICENSE files for more details.
//++

import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { I18nService } from 'core-app/core/i18n/i18n.service';
import {
  compareByHref,
  halHref,
} from 'core-app/shared/helpers/angular/tracking-functions';
import { BannersService } from 'core-app/core/enterprise/banners.service';
import { WorkPackageViewFiltersService } from 'core-app/features/work-packages/routing/wp-view-base/view-services/wp-view-filters.service';
import { SchemaCacheService } from 'core-app/core/schemas/schema-cache.service';
import { CurrentProjectService } from 'core-app/core/current-project/current-project.service';
import { QueryFilterInstanceResource } from 'core-app/features/hal/resources/query-filter-instance-resource';
import { QueryFilterResource } from 'core-app/features/hal/resources/query-filter-resource';
import { WorkPackageViewBaselineService } from 'core-app/features/work-packages/routing/wp-view-base/view-services/wp-view-baseline.service';
import { FormsModule } from '@angular/forms';
import { FilterBooleanValueComponent } from '../filter-boolean-value/filter-boolean-value.component';
import { FilterIntegerValueComponent } from '../filter-integer-value/filter-integer-value.component';
import { FilterDateValueComponent } from '../filter-date-value/filter-date-value.component';
import { FilterDatesValueComponent } from '../filter-dates-value/filter-dates-value.component';
import { FilterDateTimeValueComponent } from '../filter-date-time-value/filter-date-time-value.component';
import { FilterDateTimesValueComponent } from '../filter-date-times-value/filter-date-times-value.component';
import { FilterStringValueComponent } from '../filter-string-value/filter-string-value.component';
import { FilterProjectComponent } from '../filter-project/filter-project.component';
import { FilterToggledMultiselectValueComponent } from '../filter-toggled-multiselect-value/filter-toggled-multiselect-value.component';
import { FilterSearchableMultiselectValueComponent } from '../filter-searchable-multiselect-value/filter-searchable-multiselect-value.component';
import { OpIconComponent } from 'core-app/shared/components/icon/icon.component';

@Component({
  selector: '[query-filter]',
  styleUrls: ['./query-filter.component.sass'],
  templateUrl: './query-filter.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    OpIconComponent,
    FormsModule,
    FilterBooleanValueComponent,
    FilterIntegerValueComponent,
    FilterDateValueComponent,
    FilterDatesValueComponent,
    FilterDateTimeValueComponent,
    FilterDateTimesValueComponent,
    FilterStringValueComponent,
    FilterProjectComponent,
    FilterToggledMultiselectValueComponent,
    FilterSearchableMultiselectValueComponent,
  ],
})
export class QueryFilterComponent implements OnInit {
  @HostBinding('class.op-query-filter') className = true;

  @Input() public shouldFocus = false;

  @Input() public filter:QueryFilterInstanceResource;

  @Output() public filterChanged = new EventEmitter<QueryFilterResource>();

  @Output() public deactivateFilter = new EventEmitter<QueryFilterResource>();

  public availableOperators:any;

  public showValuesInput = false;

  public eeShowBanners = false;

  public baselineIncompatibleFilter = false;

  public compareByHref = compareByHref;

  public text = {
    open_filter: this.I18n.t('js.filter.description.text_open_filter'),
    close_filter: this.I18n.t('js.filter.description.text_close_filter'),
    label_filter_add: this.I18n.t('js.work_packages.label_filter_add'),
    upsell_for_more: this.I18n.t('js.filter.upsell_for_more'),
    upsell_link: this.I18n.t('js.filter.upsell_link'),
    button_delete: this.I18n.t('js.button_delete'),
    incompatible_filter: this.I18n.t('js.work_packages.filters.baseline_incompatible'),
  };

  constructor(
    readonly wpTableFilters:WorkPackageViewFiltersService,
    readonly wpTableBaseline:WorkPackageViewBaselineService,
    readonly schemaCache:SchemaCacheService,
    readonly I18n:I18nService,
    readonly currentProject:CurrentProjectService,
  ) {
  }

  public onFilterUpdated(filter:QueryFilterInstanceResource) {
    this.filter = filter;
    this.showValuesInput = this.showValues();
    this.filterChanged.emit();
  }

  public removeThisFilter() {
    this.deactivateFilter.emit(this.filter);
  }

  public get valueType():string|undefined {
    if (this.filter.currentSchema && this.filter.currentSchema.values) {
      return this.filter.currentSchema.values.type;
    }

    return undefined;
  }

  ngOnInit() {
    this.availableOperators = this.schemaCache.of(this.filter).availableOperators;
    this.showValuesInput = this.showValues();
    this.baselineIncompatibleFilter = this.wpTableBaseline.isActive() && this.wpTableBaseline.isIncompatibleFilter(this.filter.id);
  }

  private showValues() {
    return this.filter.currentSchema!.isValueRequired() && this.filter.currentSchema!.values!.type !== '[1]Boolean';
  }
}

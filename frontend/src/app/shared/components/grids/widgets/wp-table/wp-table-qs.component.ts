import { Component } from '@angular/core';
import { AbstractWidgetComponent } from 'core-app/shared/components/grids/widgets/abstract-widget.component';
import { WidgetChangeset } from 'core-app/shared/components/grids/widgets/widget-changeset';
import { WorkPackageIsolatedQuerySpaceDirective } from '../../../../../features/work-packages/directives/query-space/wp-isolated-query-space.directive';
import { WidgetWpTableComponent } from './wp-table.component';

@Component({
  templateUrl: './wp-table-qs.component.html',
  styleUrls: ['./wp-table-qs.component.sass'],
  imports: [WorkPackageIsolatedQuerySpaceDirective, WidgetWpTableComponent],
})
export class WidgetWpTableQuerySpaceComponent extends AbstractWidgetComponent {
  public onResourceChanged(changeset:WidgetChangeset) {
    this.resourceChanged.emit(changeset);
  }
}

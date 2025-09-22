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
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { StateService } from '@uirouter/core';
import { ConfigurationService } from 'core-app/core/config/configuration.service';
import { CurrentUserService } from 'core-app/core/current-user/current-user.service';
import { RecentItemsService } from 'core-app/core/recent-items.service';
import { ProjectResource } from 'core-app/features/hal/resources/project-resource';
import { WorkPackageResource } from 'core-app/features/hal/resources/work-package-resource';
import { HalResourceNotificationService } from 'core-app/features/hal/services/hal-resource-notification.service';
import { WpSingleViewService } from 'core-app/features/work-packages/routing/wp-view-base/state/wp-single-view.service';
import { WorkPackageViewSelectionService } from 'core-app/features/work-packages/routing/wp-view-base/view-services/wp-view-selection.service';
import { WorkPackageSingleViewBase } from 'core-app/features/work-packages/routing/wp-view-base/work-package-single-view.base';
import { WorkPackageNotificationService } from 'core-app/features/work-packages/services/notifications/work-package-notification.service';
import { Observable, of } from 'rxjs';
import { EditFormComponent } from '../../../../shared/components/fields/edit/edit-form/edit-form.component';
import { WorkPackageBreadcrumbComponent } from '../../components/wp-breadcrumb/wp-breadcrumb.component';
import { BackButtonComponent } from '../../components/back-routing/back-button.component';
import { WorkPackageSubjectComponent } from '../../components/wp-subject/wp-subject.component';
import { WorkPackageCreateButtonComponent } from '../../components/wp-buttons/wp-create-button/wp-create-button.component';
import { WorkPackageShareButtonComponent } from '../../components/wp-buttons/wp-share-button/wp-share-button.component';
import { WorkPackageTimerButtonComponent } from '../../components/wp-timer-button/wp-timer-button.component';
import { WorkPackageWatcherButtonComponent } from '../../components/wp-watcher-button/wp-watcher-button.component';
import { WorkPackageReminderButtonComponent } from '../../components/wp-buttons/wp-reminder-button/wp-reminder-button.component';
import { WorkPackageMarkNotificationButtonComponent } from '../../components/wp-buttons/wp-mark-notification-button/work-package-mark-notification-button.component';
import { ZenModeButtonComponent } from '../../components/wp-buttons/zen-mode-toggle-button/zen-mode-toggle-button.component';
import { WorkPackageSingleContextMenuDirective } from '../../../../shared/components/op-context-menu/wp-context-menu/wp-single-context-menu';
import { WorkPackageSingleViewComponent } from '../../components/wp-single-view/wp-single-view.component';
import { WpTabsComponent } from '../../components/wp-tabs/components/wp-tabs/wp-tabs.component';
import { UIView } from '@uirouter/angular';
import { WpResizerComponent } from '../../../../shared/components/resizer/resizer/wp-resizer.component';
import { AsyncPipe } from '@angular/common';

@Component({
  templateUrl: './wp-full-view.html',
  selector: 'wp-full-view-entry',
  // Required class to support inner scrolling on page
  host: { class: 'work-packages-page--ui-view' },
  providers: [
    WpSingleViewService,
    { provide: HalResourceNotificationService, useExisting: WorkPackageNotificationService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    EditFormComponent,
    WorkPackageBreadcrumbComponent,
    BackButtonComponent,
    WorkPackageSubjectComponent,
    WorkPackageCreateButtonComponent,
    WorkPackageShareButtonComponent,
    WorkPackageTimerButtonComponent,
    WorkPackageWatcherButtonComponent,
    WorkPackageReminderButtonComponent,
    WorkPackageMarkNotificationButtonComponent,
    ZenModeButtonComponent,
    WorkPackageSingleContextMenuDirective,
    WorkPackageSingleViewComponent,
    WpTabsComponent,
    UIView,
    WpResizerComponent,
    AsyncPipe,
  ],
})
export class WorkPackagesFullViewComponent extends WorkPackageSingleViewBase implements OnInit {
  // Watcher properties
  public isWatched:boolean;

  public displayReminderButton$:Observable<boolean> = of(false);

  public displayShareButton$:false|Observable<boolean> = false;

  public displayTimerButton = false;

  public displayWatchButton = false;

  public watchers:any;

  public text = {
    fullView: {
      buttonMore: this.i18n.t('js.button_more'),
    },
  };

  stateName$ = of('work-packages.new');

  constructor(
    public injector:Injector,
    public wpTableSelection:WorkPackageViewSelectionService,
    public recentItemsService:RecentItemsService,
    readonly $state:StateService,
    readonly currentUserService:CurrentUserService,
    private readonly configurationService:ConfigurationService,
  ) {
    super(injector, $state.params.workPackageId);
  }

  // enable other parts of the application to trigger an immediate update
  // e.g. a stimulus controller
  // currently used by the new activities tab which does its own polling
  @HostListener('document:ian-update-immediate')
  triggerImmediateUpdate() {
    this.storeService.reload();
  }

  ngOnInit():void {
    this.observeWorkPackage();
  }

  protected init() {
    super.init();

    if (this.workPackage.id) {
      this.recentItemsService.add(this.workPackage.id);

      // Set Focused WP
      this.wpTableFocus.updateFocus(this.workPackage.id);
    }

    this.setWorkPackageScopeProperties(this.workPackage);
  }

  private setWorkPackageScopeProperties(wp:WorkPackageResource) {
    this.isWatched = Object.prototype.hasOwnProperty.call(wp, 'unwatch');
    this.displayWatchButton = Object.prototype.hasOwnProperty.call(wp, 'unwatch') || Object.prototype.hasOwnProperty.call(wp, 'watch');
    this.displayTimerButton = Object.prototype.hasOwnProperty.call(wp, 'logTime');
    this.displayShareButton$ = this.currentUserService.hasCapabilities$('work_package_shares/index', (wp.project as ProjectResource).id);
    this.displayReminderButton$ = this.currentUserService.isLoggedInAndHasCapabalities$(
      'work_packages/read',
      (this.workPackage.project as ProjectResource).id,
    );

    // watchers
    if (wp.watchers) {
      this.watchers = (wp.watchers as any).elements;
    }
  }
}

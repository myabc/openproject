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

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WorkPackageCopyController } from 'core-app/features/work-packages/components/wp-copy/wp-copy.controller';
import { EditFormComponent } from '../../../../shared/components/fields/edit/edit-form/edit-form.component';
import { WorkPackageTypeStatusComponent } from '../wp-type-status/wp-type-status.component';
import { WorkPackageSingleViewComponent } from '../wp-single-view/wp-single-view.component';
import { WorkPackageEditActionsBarComponent } from '../edit-actions-bar/wp-edit-actions-bar.component';
import { WpResizerComponent } from '../../../../shared/components/resizer/resizer/wp-resizer.component';

@Component({
  selector: 'wp-copy-split-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: '../wp-new/wp-new-split-view.html',
  imports: [
    EditFormComponent,
    WorkPackageTypeStatusComponent,
    WorkPackageSingleViewComponent,
    WorkPackageEditActionsBarComponent,
    WpResizerComponent,
  ],
})
export class WorkPackageCopySplitViewComponent extends WorkPackageCopyController {
}

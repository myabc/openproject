import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { OpModalWrapperAugmentService } from './modal-wrapper-augment.service';
import { OpModalBannerComponent } from 'core-app/shared/components/modal/modal-banner/modal-banner.component';
import { OpModalOverlayComponent } from 'core-app/shared/components/modal/modal-overlay.component';
import { CommonModule } from '@angular/common';
import { OpCustomModalOverlayComponent } from 'core-app/shared/components/modal/custom-modal-overlay.component';
import { ModalWithTurboContentDirective } from 'core-app/shared/components/fields/edit/modal-with-turbo-content/modal-with-turbo-content.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    A11yModule,
    OpModalBannerComponent,
    OpModalOverlayComponent,
    OpCustomModalOverlayComponent,
    ModalWithTurboContentDirective,
  ],
  exports: [
    OpModalOverlayComponent,
    OpCustomModalOverlayComponent,
    OpModalBannerComponent,
    ModalWithTurboContentDirective,
  ],
  providers: [
    OpModalWrapperAugmentService,
  ],
})
export class OpenprojectModalModule { }

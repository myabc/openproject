import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { OpContentLoaderComponent } from '../op-content-loader.component';

@Component({
  selector: 'op-principal-loading-skeleton',
  templateUrl: './op-principal-loading-skeleton.component.html',
  styleUrls: ['./op-principal-loading-skeleton.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpContentLoaderComponent],
})
export class OpPrincipalLoadingComponent {

}

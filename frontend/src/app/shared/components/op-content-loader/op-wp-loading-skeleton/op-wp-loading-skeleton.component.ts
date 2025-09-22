import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { OpContentLoaderComponent } from '../op-content-loader.component';

@Component({
  selector: 'op-wp-loading-skeleton',
  templateUrl: './op-wp-loading-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./op-wp-loading-skeleton.component.sass'],
  imports: [OpContentLoaderComponent],
})
export class OpWPLoadingComponent {
  @Input() public viewBox?:string = '0 0 800 80';
}

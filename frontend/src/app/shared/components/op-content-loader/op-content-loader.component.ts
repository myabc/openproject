import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
  selector: 'op-content-loader',
  templateUrl: './op-content-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContentLoaderModule],
})
export class OpContentLoaderComponent implements OnInit {
  @Input() public viewBox = '0 0 400 130';

  baseUrl:string;

  ngOnInit():void {
    this.baseUrl = window.appBasePath;
  }
}

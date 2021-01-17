import { OnDestroy, OnInit, Directive } from '@angular/core';
import { ResourceBundle } from '@app/shared/common/resource-bundle';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  res = ResourceBundle;

  ngUnsubscribe = new Subject();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

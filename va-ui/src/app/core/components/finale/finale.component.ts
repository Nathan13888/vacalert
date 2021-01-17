import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CelebrateComponent } from '@app/shared/components/celebrate/celebrate.component';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-finale',
  templateUrl: './finale.component.html',
  styleUrls: ['./finale.component.css'],
})
export class FinaleComponent extends BaseComponent {
  done: boolean;

  @ViewChild(CelebrateComponent) celebrateComponent: CelebrateComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const done = 'Y' === params.get('done');
          return of(done);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((done: boolean) => {
        this.done = done;
      });
  }

  onAnswer(b: boolean) {
    this.done = b;
    if (b) {
      this.celebrateComponent.start();
    } else {
      this.navigationService.navigate('/home');
    }
  }
}

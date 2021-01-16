import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoadingIndicatorService } from '@app/core/services/loading-indicator.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  debounceTime = 500;
  loadingSubscription: Subscription;
  loading = false;

  constructor(
    private element: ElementRef,
    private loadingIndicatorService: LoadingIndicatorService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingIndicatorService.loadingStatus$
      .pipe(debounceTime(this.debounceTime))
      .subscribe((status: boolean) => {
        this.loading = status;
      });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}

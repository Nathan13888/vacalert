import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator-goto',
  templateUrl: './paginator-goto.component.html',
  styleUrls: ['./paginator-goto.component.css'],
})
export class PaginatorGotoComponent implements OnInit, OnChanges {
  @Input() hidePageSize = false;
  @Input() pageSizeOptions: number[];
  @Input() showFirstLastButtons = true;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() length: number;

  @Output()
  page = new EventEmitter<PageEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('goToContainer') goToContainerRef: ElementRef;

  goTo: number;
  pageNumbers: number[];
  goToDisabled = false;

  constructor(private element: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const prevBtn = <HTMLElement>(
      this.element.nativeElement.querySelector(
        '.mat-paginator-navigation-previous'
      )
    );
    const goToPageEl = <HTMLElement>this.goToContainerRef.nativeElement;
    goToPageEl.remove();
    prevBtn.insertAdjacentElement('afterend', goToPageEl);
    goToPageEl.classList.remove('hide');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageIndex || changes.pageSize || changes.length) {
      this.updateGoto();
    }
  }

  private updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    const count = Math.floor((this.length - 1) / this.pageSize) + 1 || 1;
    for (let i = 1; i <= count; i++) {
      this.pageNumbers.push(i);
    }
    this.goToDisabled = count === 1;
  }

  paginationChange(pageEvt: PageEvent) {
    this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.emitPageEvent(pageEvt);
  }

  goToPageChange() {
    this.paginator.pageIndex = this.goTo - 1;
    this.emitPageEvent({
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
    });
  }

  private emitPageEvent(pageEvent: PageEvent) {
    this.page.next(pageEvent);
  }
}

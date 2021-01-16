import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorIntlService extends MatPaginatorIntl {
  constructor() {
    super();

    this.itemsPerPageLabel = 'Maximum items per page:';
    this.nextPageLabel = 'Next';
    this.previousPageLabel = 'Previous';
    this.firstPageLabel = 'First';
    this.lastPageLabel = 'Last';

    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 of ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      if (startIndex + 1 === endIndex) {
        return `${endIndex} of ${length}`;
      } else {
        return `${startIndex + 1} – ${endIndex} of ${length}`;
      }
    };
  }
}

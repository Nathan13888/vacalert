import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// ::ng-deep.latex-editor-popup .mat-dialog-container {
//   resize: both;
//   overflow: auto;
//   background: #fff;
// }

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private dialog: MatDialog, private overlay: Overlay) {}

  openFullWindow<T>(component: ComponentType<T>, data: any): Observable<any> {
    const w = window.innerWidth + 'px';
    const dialogRef = this.dialog.open(component, {
      panelClass: 'full-window-popup',
      // width: window.innerWidth + 'px',
      // height: window.innerHeight + 'px',
      // width: w,
      // height: '100vh',
      width: '100vw',
      height: '100vh',
      backdropClass: 'dialog-backdrop',
      data,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      // disableClose: true,
      // maxWidth: screen.width + 'px',
      // maxHeight: screen.height + 'px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: false,
    });

    const listener = (e: any) => {
      console.log('resize :>> ', e);
      console.log('window.innerWidth  :>> ', window.innerWidth);
      dialogRef.updateSize(window.innerWidth + 'px', window.innerHeight + 'px');
    };
    window.addEventListener('resize', listener);

    return dialogRef.afterClosed().pipe(
      tap(() => {
        console.log('remove lis :>> ');
        window.removeEventListener('resize', listener);
      })
    );
  }
}

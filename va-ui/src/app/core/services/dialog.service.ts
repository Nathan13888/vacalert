import { Overlay } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AlertDialogComponent } from '@app/shared/components/alert-dialog/alert-dialog.component';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  lastDialogRef: MatDialogRef<any, any>;

  constructor(
    public dialog: MatDialog,
    private overlay: Overlay,
    private snackBar: MatSnackBar
  ) {}

  toast(message: string, durationMs?: number) {
    const duration = durationMs || 3000;
    const snackBarRef = this.snackBar.open(message, undefined, {
      duration,
      panelClass: ['snackbar-container'],
    });
    return snackBarRef;
  }

  confirm(message: string): Observable<boolean> {
    return this.displayAlert(message);
  }

  alert(message: string): Observable<boolean> {
    return this.displayAlert(message, 'ok');
  }

  private displayAlert(message: string, style?: string): Observable<boolean> {
    if (this.lastDialogRef) {
      this.lastDialogRef.close();
    }
    this.lastDialogRef = this.dialog.open(AlertDialogComponent, {
      width: '350px',
      data: { message, style },
      scrollStrategy: this.overlay.scrollStrategies.close(),
      backdropClass: 'dialog-backdrop',
    });
    return this.lastDialogRef.afterClosed();
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { DialogService } from '@app/core/services/dialog.service';
import { Observable } from 'rxjs';
import { ResourceBundle } from '../common/resource-bundle';

export interface IDeactivateComponent {
  onDeactivate(): string | null;
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateGuard implements CanDeactivate<IDeactivateComponent> {
  constructor(private dialogService: DialogService) {}

  canDeactivate(
    component: IDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.onDeactivate) {
      let message = component.onDeactivate();
      if (message !== null) {
        if (message === '') {
          message = ResourceBundle.UnsavedChangesPrompt;
        }
        return this.dialogService.confirm(message);
      }
    }
    return true;
  }
}

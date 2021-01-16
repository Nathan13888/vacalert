import { Injectable } from '@angular/core';
import { NavToolbarComponent } from '@app/core/components/nav-toolbar/nav-toolbar.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavToolbarService {
  instance: NavToolbarComponent;

  editMode$ = new Subject<boolean>();
  private editModeEnabled: boolean;

  constructor() {
    this.enableEditMode(false);
  }

  defaultInstance() {
    this.instance.resetToDefault();
    return this.instance;
  }

  toggleEditMode() {
    this.enableEditMode(!this.editModeEnabled);
  }

  enableEditMode(enable: boolean) {
    this.editModeEnabled = enable;
    this.editMode$.next(this.editModeEnabled);
  }

  isEditModeEnabled(): boolean {
    return this.editModeEnabled;
  }
}

import { Injectable } from '@angular/core';
import { UserProfile } from '@app/api/model/userProfile';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  userProfile: UserProfile;

  constructor() {}
}

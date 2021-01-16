import { Injectable } from '@angular/core';
import { UserProfile } from '@app/api/model/userProfile';

export interface Appointment {
  time?: string;
  locationId?: string;
  customLocation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  userProfile: UserProfile;

  appointment: Appointment = {};

  constructor() {}
}

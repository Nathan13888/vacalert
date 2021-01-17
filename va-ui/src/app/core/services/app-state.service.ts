import { Injectable } from '@angular/core';
import { UserProfile } from '@app/api/model/userProfile';

export interface Appointment {
  time?: string;
  locationId?: string;
  customLocation?: string;
  dose?: number;
  submitted?: boolean;
}

export interface AlertSubscription {
  webEnabled?: boolean;
  smsEnabled?: boolean;
  emailEnabled?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  userProfile: UserProfile;

  appointment: Appointment;

  alertSubscription: AlertSubscription = {};

  constructor() {}
}

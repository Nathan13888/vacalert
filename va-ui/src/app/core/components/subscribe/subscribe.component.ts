import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { VonageControllerService } from '@app/api/api/vonageController.service';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  displayToken: string;
  phoneNumber: string;

  emailFormSubmitted: boolean;
  emailFormSuccess: boolean;
  emailForm: FormGroup;

  constructor(
    private toolbarService: NavToolbarService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private vonageController: VonageControllerService,
    private formBuilder: FormBuilder,
    ) {
      this.swUpdate.available.subscribe(_ => this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
      }));
      this.swPush.messages.subscribe(msg => console.log('Push message: ', msg));
      this.swPush.notificationClicks.subscribe(click => console.log('Notification clicked: ', click));
      if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebaseConfig);
        navigator.serviceWorker.getRegistration().then(swr => firebase.messaging().useServiceWorker(swr));
      }

      this.emailFormSubmitted = false;
      this.emailFormSuccess = true;
      this.emailForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableSubscribe = false;
  }

  subscribeBrowserNotifications(): void {
    console.log('Requesting browser notification permissions');
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => this.displayToken = token))
      .catch(err => {
        console.error('Unable to get permission to notify.', err);
      });
  }

  subscribeEmailUpdates(): void {
    console.log('Subscribing to email updates');
    this.emailFormSubmitted = true;
    if (this.emailForm.invalid) {
        this.emailFormSuccess = false;
        return;
    }

  }

  subscribeSMSUpdates(): void {
    console.log('Subscribing to Vonage SMS');
    this.vonageController.vonageControllerSmsSubscribe(this.phoneNumber);
  }
}

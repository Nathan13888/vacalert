import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { SubscriptionControllerService } from '@app/api';
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
  emailFormSubmitted: boolean;
  emailFormSuccess: boolean;
  emailForm: FormGroup;

  smsFormSubmitted: boolean;
  smsFormSuccess: boolean;
  smsForm: FormGroup;

  constructor(
    private toolbarService: NavToolbarService,
    private swUpdate: SwUpdate,
    private swPush: SwPush,
    private subscriptionControllerService: SubscriptionControllerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableSubscribe = false;

    this.swUpdate.available.subscribe((_) =>
      this.swUpdate.activateUpdate().then(() => {
        document.location.reload();
      })
    );
    this.swPush.messages.subscribe((msg) => console.log('Push message: ', msg));
    this.swPush.notificationClicks.subscribe((click) =>
      console.log('Notification clicked: ', click)
    );

    this.emailFormSubmitted = false;
    this.emailFormSuccess = true;
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.smsFormSubmitted = false;
    this.smsFormSuccess = true;
    this.smsForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required]],
    });

    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((reg) => {
          navigator.serviceWorker.getRegistration().then((swr) => {
            firebase.messaging().useServiceWorker(swr);
          });
        });
      }
    }
  }

  hasError(control: AbstractControl, validationType: string) {
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  subscribeBrowserNotifications(): void {
    console.log('Requesting browser notification permissions');
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() =>
        messaging.getToken().then((token) => {
          console.log('Saving browser subscription request');
          this.subscriptionControllerService
            .subscriptionControllerSubscribeBrowserNotifications({
              deviceToken: token,
            })
            .subscribe(
              (res) => {
                console.log('Successfully subscribed to browser notification!');
              },
              (err) => {
                console.error(
                  'Failed to subscribe to browser notification!',
                  err
                );
              }
            );
        })
      )
      .catch((err) => {
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
    console.log(this.emailForm.controls.email.value);
    this.subscriptionControllerService
      .subscriptionControllerSubscribeEmail({
        email: this.emailForm.controls.email.value,
      })
      .subscribe(
        (res) => {
          console.log('Successfully subscribed to email notification!');
        },
        (err) => {
          console.error('Failed to subscribe to email notification!', err);
        }
      );
  }

  subscribeSMSUpdates(): void {
    console.log('Subscribing to Vonage SMS');
    console.log(this.smsForm.controls.phoneNumber.value);
    this.subscriptionControllerService
      .subscriptionControllerSubscribeSMS({
        phoneNumber: this.smsForm.controls.phoneNumber.value,
      })
      .subscribe(
        (res) => {
          console.log('Successfully subscribed to sms notification!');
        },
        (err) => {
          console.error('Failed to subscribe to sms notification!', err);
        }
      );
  }
}

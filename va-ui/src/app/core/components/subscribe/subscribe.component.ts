import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
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

  constructor(
    private toolbarService: NavToolbarService,
    private swUpdate: SwUpdate,
    private swPush: SwPush
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
    }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableSubscribe = false;
  }

  subscribeBrowserNotifications(): void {
    const messaging = firebase.messaging();
    messaging.requestPermission()
      .then(() => messaging.getToken().then(token => this.displayToken = token))
      .catch(err => {
        console.error('Unable to get permission to notify.', err);
      });
  }
}

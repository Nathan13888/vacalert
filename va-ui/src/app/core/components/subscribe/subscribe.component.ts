import { Component, OnInit } from '@angular/core';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  constructor(private toolbarService: NavToolbarService) {}

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableSubscribe = false;
  }
}

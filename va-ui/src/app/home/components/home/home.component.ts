import { Component, OnInit } from '@angular/core';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private toolbarService: NavToolbarService) {}

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableHome = false;
    toolbar.heading = 'Home';
  }
}

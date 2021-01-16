import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.css']
})
export class MessagePanelComponent implements OnInit {

  @Input()
  public error: string;

  constructor() { }

  ngOnInit() {
  }

}

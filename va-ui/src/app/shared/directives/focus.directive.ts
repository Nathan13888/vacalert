import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements AfterViewInit {
  @Input('appFocus')
  private focus = true;

  @Output('focused')
  focused = new EventEmitter();

  constructor(public element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.focus) {
      setTimeout(() => {
        this.element.nativeElement.focus();
        this.focused.emit();
      }, 0);
    }
  }
}

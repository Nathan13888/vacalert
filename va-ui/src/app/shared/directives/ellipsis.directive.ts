import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  exportAs: 'ellipsis'
})
export class EllipsisDirective implements OnInit {
  @Input('appEllipsis')
  outOfBound = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const element = this.elementRef.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
      this.outOfBound = true;
    } else {
      this.outOfBound = false;
    }
  }
}

import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { PopoverDirective } from './popover.directive';

export class HoverEvent {
  constructor(
    public source: HoverDirective,
    public mouseEvent: MouseEvent,
    public activated: boolean
  ) {}
}

@Directive({
  selector: '[appHover]',
})
export class HoverDirective implements OnDestroy {
  @Input('appHover')
  popoverDirective?: PopoverDirective;

  @Output() hover = new EventEmitter<HoverEvent>();

  popoverListener: any;

  get popover() {
    return this.popoverDirective?.overlayRef.overlayElement;
  }

  get elem() {
    return this.elemRef.nativeElement;
  }

  constructor(private elemRef: ElementRef) {}

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent) {
    this.onHoverChange(event, true);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.onHoverChange(event, true);
  }

  @HostListener('mouseout', ['$event']) onMouseOut(event: MouseEvent) {
    this.onHoverChange(event, false);
  }

  onHoverChange(mouseEvent: MouseEvent, hover: boolean) {
    if (hover) {
      this.removePopoverListener();
      this.hover.emit(new HoverEvent(this, mouseEvent, true));
      this.popoverDirective?.show(mouseEvent);
    } else {
      if (this.isHoverPopover()) {
        this.popoverListener = (ev: MouseEvent) => {
          this.removePopoverListener();
          this.hover.emit(new HoverEvent(this, mouseEvent, false));

          this.popoverDirective?.hide();
        };
        this.popover?.addEventListener('mouseleave', this.popoverListener);
      } else {
        this.hover.emit(new HoverEvent(this, mouseEvent, false));
        this.popoverDirective?.hide();
      }
    }
  }

  private removePopoverListener() {
    if (this.popover && this.popoverListener) {
      this.popover.removeEventListener('mouseleave', this.popoverListener);
      this.popoverListener = undefined;
    }
  }

  private isHoverPopover() {
    if (this.popover) {
      const el = this.popover;
      return !!(
        el.querySelector(':hover') ||
        el.parentNode?.querySelector(':hover') === el
      );
    }
    return false;
  }

  ngOnDestroy(): void {
    this.elem.removeEventListener('mousemove', this.onMouseMove);
  }
}

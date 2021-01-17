import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appPopover]',
  exportAs: 'popover',
})
export class PopoverDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() appPopover!: TemplateRef<object>;
  private unsubscribe = new Subject();
  public overlayRef!: OverlayRef;
  constructor(private overlay: Overlay, public vcr: ViewContainerRef) {}

  ngOnInit(): void {
    this.createOverlay();
  }

  ngAfterViewInit(): void {}

  show(event: MouseEvent) {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: event.clientX + 10, y: event.clientY + 10 })
      .withPositions([
        new ConnectionPositionPair(
          { originX: 'start', originY: 'top' },
          { overlayX: 'start', overlayY: 'top' }
        ),
      ])
      .withPush(true);
    this.overlayRef.updatePositionStrategy(positionStrategy);
    this.attachOverlay();
  }

  hide() {
    this.detachOverlay();
  }

  private createOverlay(): void {
    const scrollStrategy = this.overlay.scrollStrategies.close();

    this.overlayRef = this.overlay.create({
      scrollStrategy,
      hasBackdrop: false,
    });
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.appPopover,
        this.vcr
      );
      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

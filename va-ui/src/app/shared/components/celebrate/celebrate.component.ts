import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import confetti from 'canvas-confetti';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-celebrate',
  templateUrl: './celebrate.component.html',
  styleUrls: ['./celebrate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebrateComponent
  extends BaseComponent
  implements OnInit, OnChanges, OnDestroy {
  canvasContainer: HTMLElement;
  canvas: HTMLCanvasElement;
  confettiCanvas: confetti.CreateTypes;
  interval: NodeJS.Timeout;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {
    super();
  }

  ngOnInit(): void {
    this.canvasContainer = this.elementRef.nativeElement.parentElement;
  }

  ngOnChanges(changes: SimpleChanges) {}

  start() {
    this.stop(true);

    if (this.canvas) {
      this.renderer2.removeChild(this.canvasContainer, this.canvas);
    }
    this.canvas = this.renderer2.createElement('canvas');
    this.renderer2.appendChild(this.canvasContainer, this.canvas);

    this.confettiCanvas = confetti.create(this.canvas, {
      resize: true,
      useWorker: true,
    });

    const end = Date.now() + 2 * 1000;
    this.interval = setInterval(() => {
      if (Date.now() > end) {
        this.stop();
        return;
      }
      this.confettiCanvas({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        shapes: ['circle', 'square'],
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        zIndex: 9999,
      });
    }, 200);
  }

  stop(immediate?: boolean) {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
    if (immediate && this.confettiCanvas) {
      this.confettiCanvas.reset();
      this.confettiCanvas = undefined;
    }
  }

  ngOnDestroy() {
    this.stop(true);
    super.ngOnDestroy();
  }
}

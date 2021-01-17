import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  elem: any;
  fullscreen = false;
  constructor(@Inject(DOCUMENT) private document: any) {
    this.elem = document.documentElement;
    this.document.onfullscreenchange = (event: any) => {
      this.fullscreen = this.document.fullscreenElement !== null;
      console.log('this.fullscreen :>> ', this.fullscreen);
    };
  }

  setFullscreen(fullscreen: boolean) {
    this.fullscreen = fullscreen;
    if (this.fullscreen) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  private openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  private closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
}

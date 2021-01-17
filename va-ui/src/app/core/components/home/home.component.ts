import { Component, OnInit, ViewChild } from '@angular/core';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import SwiperCore, {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  HashNavigation,
  Keyboard,
  Lazy,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper/types';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Keyboard,
  Autoplay,
  Controller,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  EffectFlip,
  HashNavigation,
  History,
  Lazy,
  Mousewheel,
  Parallax,
  Thumbs,
  Virtual,
  Zoom,
]);

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  config: SwiperOptions = {
    speed: 600,
    parallax: true,
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    zoom: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    updateOnWindowResize: true,
    spaceBetween: 50,
    centeredSlides: true,
  };
  @ViewChild(SwiperComponent) swiper?: SwiperComponent;

  parallax = -100;

  constructor(private toolbarService: NavToolbarService) {}

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableHome = false;
  }
}

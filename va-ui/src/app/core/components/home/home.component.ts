import { Component, ViewChild } from '@angular/core';
import { AssessmentControllerService } from '@app/api/api/assessmentController.service';
import { UserProfile } from '@app/api/model/userProfile';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs/operators';
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
export class HomeComponent extends BaseComponent {
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
    autoplay: {
      delay: 20000,
      disableOnInteraction: false,
    },
  };
  @ViewChild(SwiperComponent) swiper?: SwiperComponent;

  parallax = -100;

  constructor(
    private toolbarService: NavToolbarService,
    private assessmentService: AssessmentControllerService
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableHome = false;
  }

  onCompletedQuestions(userProfile: UserProfile) {
    this.assessmentService
      .assessmentControllerGetResult(userProfile)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {});
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}

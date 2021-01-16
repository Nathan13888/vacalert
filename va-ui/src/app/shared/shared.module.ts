import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagePanelComponent } from '@app/shared/components/message-panel/message-panel.component';
import { FocusDirective } from '@app/shared/directives/focus.directive';
import { IntegerOnlyDirective } from '@app/shared/directives/integer-only.directive';
import { AngularMaterialModule } from '@app/shared/modules/angular-material.module';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { SwiperModule } from 'swiper/angular';
import { CelebrateComponent } from './components/celebrate/celebrate.component';
import { PaginatorGotoComponent } from './components/paginator-goto/paginator-goto.component';
import { EllipsisDirective } from './directives/ellipsis.directive';
import { IconModule } from './modules/icon.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    DragDropModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    IconModule,
    SwiperModule,
    NgSlimScrollModule,
  ],
  declarations: [
    MessagePanelComponent,
    IntegerOnlyDirective,
    FocusDirective,
    EllipsisDirective,
    PaginatorGotoComponent,
    CelebrateComponent,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MessagePanelComponent,
    IntegerOnlyDirective,
    FocusDirective,
    EllipsisDirective,
    PaginatorGotoComponent,
    CelebrateComponent,
    IconModule,
    SwiperModule,
    NgSlimScrollModule,
  ],
})
export class SharedModule {}

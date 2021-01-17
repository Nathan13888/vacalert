import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagePanelComponent } from '@app/shared/components/message-panel/message-panel.component';
import { FocusDirective } from '@app/shared/directives/focus.directive';
import { AngularMaterialModule } from '@app/shared/modules/angular-material.module';
import { NgSlimScrollModule } from 'ngx-slimscroll';
import { SwiperModule } from 'swiper/angular';
import { BooleanToggleComponent } from './components/boolean-toggle/boolean-toggle.component';
import { CelebrateComponent } from './components/celebrate/celebrate.component';
import { EllipsisDirective } from './directives/ellipsis.directive';

@NgModule({
  imports: [
    AngularMaterialModule,
    DragDropModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SwiperModule,
    NgSlimScrollModule,
  ],
  declarations: [
    MessagePanelComponent,
    FocusDirective,
    EllipsisDirective,
    CelebrateComponent,
    BooleanToggleComponent,
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MessagePanelComponent,
    FocusDirective,
    EllipsisDirective,
    CelebrateComponent,
    SwiperModule,
    NgSlimScrollModule,
    BooleanToggleComponent,
  ],
})
export class SharedModule {}

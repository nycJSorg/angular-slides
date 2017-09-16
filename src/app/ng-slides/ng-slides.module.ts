import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { SlideComponent } from './slide/slide.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SlidesComponent,
    SlideComponent,
    ProgressBarComponent
  ],
  exports: [
    SlidesComponent,
    SlideComponent,
    ProgressBarComponent
  ]
})
export class NgSlidesModule { }

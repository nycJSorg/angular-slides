import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { SlideComponent } from './slide/slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SlidesComponent,
    SlideComponent
  ],
  exports: [
    SlidesComponent,
    SlideComponent
  ]
})
export class NgSlidesModule { }

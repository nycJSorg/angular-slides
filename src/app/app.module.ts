import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgSlidesModule } from './ng-slides';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSlidesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SlidesComponent } from '../slides';

@Component({
  selector: 'ng-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  private _active: Observable<number>;
  private _count: Observable<number>;
  constructor(private _slides: SlidesComponent) { }

  ngOnInit() {
    this._active = this._slides.active;
    this._count = this._slides.count;
  }

  get active(): Observable<number> {
    return this._active;
  }

  get count(): Observable<number> {
    return this._count;
  }

  public counter(count: number): number[] {
    return Array(count).fill(0).map((x: number, i: number) => i);
  }

  public goTo(slide: number): void {
    this._slides.goTo(slide);
  }

}

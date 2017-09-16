import {
  Component, Input, Output, AfterContentInit, OnChanges, OnDestroy,
  EventEmitter, ContentChildren, QueryList, HostListener
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import { SlideComponent } from '../slide';

@Component({
  selector: 'ng-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements AfterContentInit, OnChanges, OnDestroy {
  private _active: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @Output() change: EventEmitter<number> = new EventEmitter();
  private _count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _duration: number;
  @Input()
  set duration(duration: number) {
    this._duration = duration;
  }
  private _interval: Observable<number>;
  private _intervalSubscription: Subscription;
  private _fullscreen: boolean;
  @Input()
  set fullscreen(fullscreen: boolean) {
    this._fullscreen = fullscreen;
  }
  private _keypress: boolean;
  @Input()
  set keypress(keypress: boolean) {
    this._keypress = keypress;
  }
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;

  constructor() { }

  ngAfterContentInit() {
    if (this.slides.length > 0) {
      this._count.next(this.slides.length);
      this._active.next(0);
      this._activateSlide(this._active.value);
    }
    this._intervalSet();
  }

  ngOnChanges() {
    this._intervalClear();
    this._intervalSet();
  }

  ngOnDestroy() {
    this._intervalClear();
  }

  get active(): Observable<number> {
    return this._active.asObservable();
  }

  get count(): Observable<number> {
    return this._count.asObservable();
  }

  get fullscreen(): boolean {
    return this._fullscreen;
  }

  private _activateSlide(index: number): void {
    this.slides.toArray()[index].setActive(true);
    this.change.emit(index);
  }

  public back(): void {
    this._deactivate(this._active.value);
    if (this._active.value > 0) { this._active.next(this._active.value - 1); }
    this._activateSlide(this._active.value);
    this._intervalClear();
    this._intervalSet();
  }

  private _deactivate(index: number): void {
    this.slides.toArray()[index].setActive(false);
  }

  public goTo(slide: number): void {
    if (slide >= 0 && slide < this.slides.length) {
      this._deactivate(this._active.value);
      this._active.next(slide);
      this._activateSlide(this._active.value);
      this._intervalClear();
      this._intervalSet();
    }
  }

  private _intervalClear(): void {
    if (this._intervalSubscription) {
      this._intervalSubscription.unsubscribe();
    }
  }

  private _intervalSet(): void {
    if (this._duration > 0) {
      this._interval = Observable.timer(this._duration);
      this._intervalSubscription = this._interval.subscribe((time: number) => {
        this.next();
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keypressTrigger(event: KeyboardEvent): void {
    if (event.keyCode === 37 && this._keypress) {
      this.back();
    } else if (event.keyCode === 39 && this._keypress) {
      this.next();
    }
  }

  public next(): void {
    this._deactivate(this._active.value);
    if (this._active.value < (this.slides.length - 1)) { this._active.next(this._active.value + 1); }
    this._activateSlide(this._active.value);
    this._intervalClear();
    this._intervalSet();
  }
}

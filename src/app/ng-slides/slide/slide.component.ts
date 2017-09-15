import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ng-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  private _active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _fullscreen: boolean;
  @Input()
  set fullscreen(fullscreen: boolean) {
    this._fullscreen = fullscreen;
  }

  constructor() { }

  ngOnInit() {
  }

  get active(): Observable<boolean> {
    return this._active.asObservable();
  }

  get fullscreen(): boolean {
    return this._fullscreen;
  }

  public setActive(active: boolean): void {
    this._active.next(active);
  }
}

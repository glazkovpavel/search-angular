import { Component, OnInit } from '@angular/core';
import {
  buffer,
  bufferCount,
  catchError,
  concatAll, concatMap,
  distinctUntilChanged,
  finalize,
  map,
  mergeAll, mergeMap, pairwise,
  startWith, take,
  tap
} from "rxjs/operators";
import {
  asapScheduler,
  concat,
  forkJoin,
  from,
  fromEvent,
  generate,
  interval, merge,
  Observable,
  of,
  partition, race,
  timer,
  zip
} from "rxjs";

export interface IForkJoin {
  foo: number,
  bar: number,
  baz: number,
}

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const clicks = fromEvent(document, 'click');
    // const higherOrder = clicks.pipe(
    //   map(ev => interval(1000).pipe(take(4))),
    // );
    // const firstOrder = higherOrder.pipe(concatAll());
    // firstOrder.subscribe(x => console.log(x));

    this.testPairwise();
  }

  private testPairwise(): void {
    const clicks: Observable<PointerEvent> = fromEvent(document, 'click') as Observable<PointerEvent>;
    const pairs: Observable<[PointerEvent, PointerEvent]> = clicks.pipe(pairwise());
    const distance = pairs.pipe(
      map(([first, second]: [PointerEvent, PointerEvent]) => {
        const x0: number = first.clientX;
        const y0: number = first.clientY;
        const x1: number = second.clientX;
        const y1: number = second.clientY;

        return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
      })
    )

    distance.subscribe((val: number) => {
      console.log(val);
    })

  }

}

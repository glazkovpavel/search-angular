import { Component, OnInit } from '@angular/core';
import {concat, forkJoin, fromEvent, merge, Observable, of, partition, race, timer, zip} from 'rxjs';
import {IForkJoin} from '../rxjs/rxjs.component';

@Component({
  selector: 'app-join-creation-operators',
  templateUrl: './join-creation-operators.component.html',
  styleUrls: ['./join-creation-operators.component.scss']
})
export class JoinCreationOperatorsComponent implements OnInit {

  public forkJoin$: Observable<IForkJoin>;

  public ngOnInit(): void {
    this.testMerge();
    this.testConcatZip();
    this.testPartition();
    this.testRace();
    this.testForkJoin();

  }

  private testMerge(): void {
    const mousedown$: Observable<Event> = fromEvent(document, 'mousedown');
    const mouseup$: Observable<Event> = fromEvent(document, 'mouseup');

    merge(mousedown$, mouseup$).subscribe(
      (val: Event) => {
        console.log('merge:', val.type)
      }
    )
  }

  private testConcatZip(): void {
    const mousedown$: Observable<Event> = fromEvent(document, 'mousedown');
    const mouseup$: Observable<Event> = fromEvent(document, 'mouseup');

    const sequence1$ = of(1, 2, 3, 4, 4, 5, 6, 7, 8)
    const sequence2$ = of('1', '2', '3', '4', '4', '5',' 6', '7', '8')

    const concat$ = concat(sequence1$, sequence2$)

    const resZip$ = zip(mousedown$, mouseup$)

    resZip$.subscribe(value => console.log(value[0].type, value[1].type))
    concat$.subscribe(value => console.log('concat$', value))

  }

  private testPartition(): void {
    const sequence$ = of(1, 2, 3, 4, 4, 5, 6, 7, 8)
    const [evens$, odds$] = partition(sequence$, (val: number) => val % 2 !== 0);
    const zip$ = zip(evens$, odds$)

    evens$.subscribe(
      (val: number) => {
        console.log('evens$:', val);
      }
    )

    odds$.subscribe(
      (val: number) => {
        console.log('odds$', val);
      }
    )

    zip$.subscribe((val) => {
      console.log(val);
    })

  }

  private testRace(): void {
    const mousedown$: Observable<Event> = fromEvent(document, 'click');
    const contextmenu$: Observable<Event> = fromEvent(document, 'contextmenu');

    race(mousedown$, contextmenu$).subscribe(
      (val: Event) => {
        console.log('race:', val.type)
      }
    )
  }

  private testForkJoin(): void {
    this.forkJoin$ = forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: timer(4000),
    })

    this.forkJoin$.subscribe({
      next: value => console.log(value),
      complete: () => console.log('This is how it ends!'),
    });
  }

}

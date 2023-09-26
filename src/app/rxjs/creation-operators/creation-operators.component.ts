import { Component, OnInit } from '@angular/core';
import {generate, Observable, of, timer} from 'rxjs';
import {bufferCount, concatAll, concatMap, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-creation-operators',
  templateUrl: './creation-operators.component.html',
  styleUrls: ['./creation-operators.component.scss']
})
export class CreationOperatorsComponent implements OnInit {


  public ngOnInit(): void {
    this.testOf();
    this.testTimer();
    this.testGenerate();

  }

  private testOf(): void {
    const of$: Observable<number[]> = of([1, 1, 2, 3, 4, 4, 5, 6]);
    of$
      .pipe(
        concatAll(),
        // mergeAll(),
        distinctUntilChanged(),
        bufferCount(2),
        // tap((val: number[]) => {
        //   console.log(val);
        // } )
      )
      .subscribe(
        (v: number[]) => {
          //console.log(v);
        }
      )
  }

  private testTimer() : void {
    const source = of(1, 2, 3, 4, 5);
    timer(3000).pipe(concatMap(() => source)).subscribe((val) => console.log(val))
  }

  // generate - работает по принципу цикла for
  private testGenerate(): void {
    const generate$: Observable<number> =
      generate(1, x => x < 10, x => x + 1, x => x * 2).pipe(
        concatMap((val: number) => {
          return of(val/2)
        })
      )

    generate$.subscribe(
      (val) => {
        //console.log('testGenerate:', val);
      }
    )
  }

}

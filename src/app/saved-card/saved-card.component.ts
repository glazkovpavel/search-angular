import { Component, OnInit } from '@angular/core';
import {catchError, map, pairwise, startWith, take} from 'rxjs/operators';
import {interval, Observable, of} from 'rxjs';
import {ApiServices, ISearchResult} from "../shared/api.services";
import {Model, State} from "../interface/model.interface";

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.scss'],
  providers: [ApiServices]
})
export class SavedCardComponent implements OnInit {
  model$: Observable<Model<ISearchResult, State>>


  constructor(private apiServices: ApiServices) {
    interval(1000)
      .pipe(pairwise(), take(4))
      .subscribe(console.log);
  }

  ngOnInit() {
    const idCard = localStorage.getItem('savedCardId')
    this.model$ = this.apiServices.getPhotoById(idCard).pipe(
      map((response: ISearchResult) => {
        return ({
          items: response,
          state: State.READY
        })
      }),
      startWith({state: State.PENDING}),
      catchError(() => { return of({state: State.ERROR}) } )
    )

  }

  handleDeleteCard() {

  }
}

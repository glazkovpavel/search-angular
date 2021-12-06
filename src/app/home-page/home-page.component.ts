import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServices, IGetImageResponse, ISearchResult} from "../shared/api.services";
import {catchError, map, startWith} from "rxjs/operators";
import {ICardInterface} from "../interface/card.interface";
import {Observable, of} from "rxjs";
import {Model, State} from "../interface/model.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices]
})
export class HomePageComponent implements OnInit {

  model$: Observable<Model<ISearchResult[], State>>

  search: string = '';
  per_page: number = 12;
  page: number = 1;
  total_pages: number;
  like: boolean;


  constructor(private apiServices: ApiServices) {}


  ngOnInit(): void {

    this.model$ = this.apiServices.getRandom().pipe(
      map((response: ISearchResult[]) => { return ({
        items: response,
          state: State.READY,
      })
      }),
      startWith({state: State.PENDING}),
      catchError(() => { return of({state: State.ERROR}) } )
    )

    }

  onClickSearch(search: string) {
    this.search = search
    this.onSearch()

  }

  private onSearch() {
    const query: any = this.search
    const per_page: number = this.per_page
    const page: number = this.page


    this.model$ = this.apiServices.onSearch(query, page, per_page).pipe(
      map((response: IGetImageResponse) => {
        return ({
        items: response.results,
        state: State.READY,
      })
      }),
      startWith({state: State.PENDING}),
      catchError(() => { return of({state: State.ERROR}) } )
      )

  }

  handleDisLike(id: string) {
    this.like = !this.like
    console.log('id', id)
  }

  handleLikeButtonCLick(id: string) {
    this.like = !this.like
    console.log('id', id)
  }
}

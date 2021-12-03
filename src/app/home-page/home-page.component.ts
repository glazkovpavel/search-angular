import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServices, IGetImageResponse, ISearchResult} from "../shared/api.services";
import {catchError, map, startWith} from "rxjs/operators";
import {ICardInterface} from "../interface/card.interface";
import {Observable, of} from "rxjs";
import {Model} from "../interface/model.interface";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices]
})
export class HomePageComponent implements OnInit {

  model$: Observable<Model<ISearchResult[]>>

  search: string = '';
  per_page: number = 12;
  page: number = 1;
  total_pages: number;

  constructor(private apiServices: ApiServices) {}


  ngOnInit(): void {
    // @ts-ignore
    this.model$ = this.apiServices.getRandom().pipe(
      map((response: ISearchResult[]) => { return ({
        items: response,
          state: 'READY',
      })
      }),
      startWith({state: 'PENDING'}),
      catchError(() => { return of({state: 'ERROR'}) } )
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


    // @ts-ignore
    this.model$ = this.apiServices.onSearch(query, page, per_page).pipe(
      map((response: ISearchResult[]) => { // @ts-ignore
        return ({
          // @ts-ignore
        items: response.results,
        state: 'READY',
      })
      }),
      startWith({state: 'PENDING'}),
      catchError(() => { return of({state: 'ERROR'}) } )
      )


  }
}

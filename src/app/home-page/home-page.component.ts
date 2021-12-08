import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {ApiServices, IGetImageResponse, ISearchResult} from "../shared/api.services";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from "rxjs/operators";
import {ICardInterface} from "../interface/card.interface";
import {Observable, of} from "rxjs";
import {Model, State} from "../interface/model.interface";
import {SearchComponent} from "../search/search.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {state, style, trigger} from "@angular/animations";
import {SavedServices} from "../shared/saved.services";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices],
  animations: [
    trigger('like', [
      state('start', style({
        transition: 'transform .4s',
        transform: 'scale(1)'
      })),
      state('end', style({
        transition: 'transform .4s',
        transform: 'scale(1.8)'
      }))
    ])
  ]
})
export class HomePageComponent implements OnInit {

  public remove: SearchComponent;
  public form: FormGroup;

  model$: Observable<Model<ISearchResult[], State>>

  likeState: string = 'start'
  search: string = '';
  per_page: number = 12;
  page: number = 1;
  total_pages: number;
  like: boolean = false;


  constructor(private apiServices: ApiServices, private savedServices: SavedServices) {
  }

  ngOnInit(): void {

    this.model$ = this.apiServices.getRandom().pipe(
      map((response: ISearchResult[]) => {
        return ({
          items: response,
          state: State.READY,
        })
      }),
      startWith({state: State.PENDING}),
      catchError(() => {
        return of({state: State.ERROR})
      })
    );

    this.form = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    });
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

  onClickSearch(search: string) {
    this.search = search
    this.onSearch()

  }

  handleDisLike(id: string) {
    this.like = !this.like
    this.likeState = 'end'
    console.log('id', id)
  }

  handleLikeButtonCLick(card: { card: ISearchResult }) {
    this.like = !this.like
    this.likeState = 'start'
    //localStorage.setItem('savedCardId', JSON.stringify(card))
    this.savedServices.saved(card)

    console.log('id', JSON.stringify(card))
  }

  onRandom() {
    this.ngOnInit()

  }

  onRefresh() {
    debugger
    this.apiServices.refresh();
  }
}


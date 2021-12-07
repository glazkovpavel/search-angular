import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {ApiServices, IGetImageResponse, ISearchResult} from "../shared/api.services";
import {catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap} from "rxjs/operators";
import {ICardInterface} from "../interface/card.interface";
import {Observable, of} from "rxjs";
import {Model, State} from "../interface/model.interface";
import {SearchComponent} from "../search/search.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices]
})
export class HomePageComponent implements OnInit {

  public remove: SearchComponent;
  public form: FormGroup;

  model$: Observable<Model<ISearchResult[], State>>
  searchModel: IGetImageResponse;

  search: string = '';
  per_page: number = 12;
  page: number = 1;
  total_pages: number;
  like: boolean;


  constructor(private apiServices: ApiServices) {
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


    // this.form.controls['search'].valueChanges.pipe(
    //   distinctUntilChanged(),
    //   switchMap((value: string) => this.onSearch(value)),
    //     tap((result: IGetImageResponse) => { this.searchModel = result} )
    //   ).subscribe();

    this.form.controls['search'].valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((value: string) => this.onSearch(value)),
      tap((result: IGetImageResponse) => { this.searchModel = result} )
    ).subscribe();

    console.log(this.searchModel)

  }

  // onClickSearch(search: string) {
  //   this.search = search
  //   this.onSearch()
  //
  // }

  private onSearch(value: string): Observable<IGetImageResponse> {
    const query: any = this.search
    const per_page: number = this.per_page
    const page: number = this.page

    return this.apiServices.onSearch(query, page, per_page);
    //
    // this.model$ = this.apiServices.onSearch(query, page, per_page).pipe(
    //   map((response: IGetImageResponse) => {
    //     return ({
    //       items: response.results,
    //       state: State.READY,
    //     })
    //   }),
    //   startWith({state: State.PENDING}),
    //   catchError(() => {
    //     return of({state: State.ERROR})
    //   })
    // )

  }

  handleDisLike(id: string) {
    this.like = !this.like
    console.log('id', id)
  }

  handleLikeButtonCLick(id: string) {
    this.like = !this.like
    console.log('id', id)
  }

  onRandom() {
    this.ngOnInit()

  }

  onRefresh() {
    debugger
    this.apiServices.refresh();
  }
}


import {Component, OnInit,} from '@angular/core';
import {ApiServices, IGetImageResponse} from "../shared/api.services";
import {catchError, finalize, map, startWith} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Model, State} from "../interface/model.interface";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ISearchResult} from "../interface/searchResult";
import { PaginationService} from "../shared/pagination.services";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices],
})

export class HomePageComponent implements OnInit {

  public form: UntypedFormGroup;

  model$: Observable<Model<ISearchResult[], State>>

  search: string = '';
  per_page: number = 12;
  page: number = 1;
  total_pages: number;
  pages = [];
  current_page: number;

  constructor(private apiServices: ApiServices, private paginationService: PaginationService) {
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

    this.form = new UntypedFormGroup({
      search: new UntypedFormControl(null, [
        Validators.required
      ])
    });
  }

  private onSearch() {
    const query: any = this.search
    const per_page: number = this.per_page
    const page: number = this.page
    this.pages = [];

    this.model$ = this.apiServices.onSearch(query, page, per_page).pipe(
      map((response: IGetImageResponse) => {
        return this.total_pages = response.total_pages,
          ({
          items: response.results,
          state: State.READY,
        })
      }),
      startWith({state: State.PENDING}),
      catchError(() => { return of({state: State.ERROR}) } ),
      finalize(()=> {
        this.paginationService.createPages(this.pages, this.total_pages, this.page)
      })
    )
  }

  onClickSearch(search: string) {

    if(this.search === search){
      this.search = search;
      this.onSearch();
    } else {
      this.search = search;
      this.page = 1;
      this.onSearch();
    }
  }

  onRandom() {
    this.ngOnInit()
  }

  onRefresh() {
    debugger
    this.apiServices.refresh();
  }

  pageChanged(event: any) {
    this.page = event.currentTarget.innerHTML;
    this.onSearch()
    this.pages = [];
  }
}


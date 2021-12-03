import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServices, ISearchResult} from "../shared/api.services";
import {map} from "rxjs/operators";
import {ICardInterface} from "../interface/card.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices]
})
export class HomePageComponent implements OnInit {

  card$: Observable<any>
  searchResult: Observable<ISearchResult[]>

  search = ''
  per_page: number = 12
  page: any = 1
  total_pages: number

  constructor(private apiServices: ApiServices) {}


  ngOnInit(): void {
    this.card$ = this.apiServices.getRandom()
    }

  onClickSearch(search: string) {
    this.search = search
    this.onSearch()

  }

  private onSearch() {
    const query: any = this.search
    const per_page: number = this.per_page
    const page: number = this.page

    this.card$ = this.apiServices.onSearch(query, page, per_page)
      // @ts-ignore
      .pipe(map((res: ISearchResult) => {
        console.log("res.results", res.results)
        this.total_pages = res.total_pages
       return  res.results
        }
      ))

  }
}

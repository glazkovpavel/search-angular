import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiServices} from "../shared/api.services";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {Model, State} from "../interface/model.interface";
import {ISearchResult} from "../interface/searchResult";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  providers: [ApiServices]
})
export class PhotoComponent implements OnInit {

  model$: Observable<Model<ISearchResult, State>>

  constructor(
    private apiServices: ApiServices,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.model$ = this.apiServices.getPhotoById(params.id).pipe(
        map((response: ISearchResult) => {
          return ({
            items: response,
            state: State.READY
          })
        }),
        startWith({state: State.PENDING}),
        catchError(() => { return of({state: State.ERROR}) } )
      )


    })
  }

}

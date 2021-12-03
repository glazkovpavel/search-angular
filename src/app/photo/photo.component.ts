import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiServices, ISearchResult} from "../shared/api.services";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {Model} from "../interface/model.interface";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  providers: [ApiServices]
})
export class PhotoComponent implements OnInit {

  model$: Observable<Model<ISearchResult>>
  myError: boolean

  constructor(
    private apiServices: ApiServices,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      debugger
      // @ts-ignore
      this.model$ = this.apiServices.getPhotoById(params.id).pipe(
        // @ts-ignore
        map((response: ISearchResult) => {
          return ({
            items: response,
            state: 'READY'
          })
        }),
        startWith({state: "PENDING"}),
        catchError(() => { return of({state: 'ERROR'}) } )
      )


    })
  }

}

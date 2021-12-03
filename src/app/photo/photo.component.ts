import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiServices} from "../shared/api.services";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  providers: [ApiServices]
})
export class PhotoComponent implements OnInit {

  photo$: Observable<any>
  myError: boolean


  constructor(
    private apiServices: ApiServices,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.photo$ = this.apiServices.getPhotoById(params.id)
        // @ts-ignore
        .pipe(catchError((err) => {
          if (err){
            this.myError = true
          }
        }))
      console.log(this.photo$)
    })
  }

}

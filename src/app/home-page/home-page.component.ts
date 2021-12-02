import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiServices} from "../shared/api.services";
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

  constructor(private apiServices: ApiServices) {}


  ngOnInit(): void {
    this.card$ = this.apiServices.getRandom()
    }

}

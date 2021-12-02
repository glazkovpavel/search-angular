import { Component, OnInit } from '@angular/core';
import {ApiServices} from "../shared/api.services";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ApiServices]
})
export class HomePageComponent implements OnInit {

  constructor(private apiServices: ApiServices) {}


  ngOnInit(): void {
    const con$ = this.apiServices.getRandom()
    con$.pipe(map((data) => {
      console.log(data)
    }))
  }

}

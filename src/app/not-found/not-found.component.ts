import { Component, OnInit } from '@angular/core';
import {ApiServices} from "../shared/api.services";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  providers: [ApiServices]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiServices} from "../shared/api.services";
import {Subject} from "rxjs";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  providers: [ApiServices]
})
export class NotFoundComponent implements OnInit {

  @Output() public onReboot: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  reboot() {

  }
}

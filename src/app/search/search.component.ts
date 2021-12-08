import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiServices} from "../shared/api.services";
import {distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ApiServices]
})
export class SearchComponent implements OnInit {

  @Output() onClick: EventEmitter<string> = new EventEmitter();

  @Input() form: FormGroup

  constructor() { }

  ngOnInit(): void {

  }

  onClickRemove() {
    this.form.reset();
  }

  submit() {
    this.onClick.emit(this.form.controls['search'].value)
  }
}

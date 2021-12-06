import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiServices} from "../shared/api.services";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ApiServices]
})
export class SearchComponent implements OnInit {

  @Output() onClick: EventEmitter<string> = new EventEmitter();

  form: FormGroup
  public search: string;
  public value: string = '';

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onClickRemove() {
    this.search = ''
  }

  submit() {
    this.onClick.emit(this.search)
    console.log(this.search)
  }
}

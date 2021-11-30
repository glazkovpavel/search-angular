import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onClickRemove() {

  }

  submit() {

  }
}

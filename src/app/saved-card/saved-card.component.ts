import { Component, OnInit } from '@angular/core';
import { pairwise, take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.scss']
})
export class SavedCardComponent implements OnInit {
  model: any;

  constructor() {
    interval(1000)
      .pipe(pairwise(), take(4))
      .subscribe(console.log);
  }

  ngOnInit(): void {
  }

  handleDeleteCard() {

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['../home-page/home-page.component.scss']
})
export class SavedCardComponent implements OnInit {
  model: any;

  constructor() { }

  ngOnInit(): void {
  }

  handleDeleteCard(id) {
    
  }
}

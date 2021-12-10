import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, pairwise, startWith, take} from 'rxjs/operators';
import {interval, Observable, of, Subscription} from 'rxjs';
import {ApiServices} from "../shared/api.services";
import {Model, State} from "../interface/model.interface";
import {ICardSaveInterface} from "../interface/cardSave.interface";
import {SavedServices} from "../shared/saved.services";
import {IGetCardSaveInterface} from "../interface/getCardSaveInterface";

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.scss'],
  providers: [ApiServices]
})
export class SavedCardComponent implements OnInit, OnDestroy {

  public cards: IGetCardSaveInterface[];
  private cardSubscription: Subscription;
  private cardDeleteSubscription: Subscription;


  constructor(private savedServices: SavedServices) { }

  ngOnInit() {

    this.cardSubscription = this.savedServices.getAll().subscribe(
      cards => {
        this.cards = cards
      })
  };

  handleDeleteCard(id) {
    this.cardDeleteSubscription = this.savedServices.remove(id).pipe(
      map(() => {
        this.cards = this.cards.filter(card => card.id !== id)
      })
    ).subscribe()
  };

  ngOnDestroy() {
    if(this.cardSubscription){
      this.cardSubscription.unsubscribe()
    }
    if(this.cardDeleteSubscription){
      this.cardDeleteSubscription.unsubscribe()
    }
  };
}

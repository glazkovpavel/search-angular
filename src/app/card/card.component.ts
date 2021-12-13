import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {state, style, trigger} from "@angular/animations";
import {SavedServices} from "../shared/saved.services";
import {ICardInterface} from "../interface/card.interface";
import {ISearchResult} from "../interface/searchResult";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {ICardIdInterface} from "../interface/cardId.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss',
    '../home-page/home-page.component.scss'],
  animations: [
    trigger('like', [
      state('start', style({
        transition: 'transform .4s',
        transform: 'scale(1)'
      })),
      state('end', style({
        transition: 'transform .4s',
        transform: 'scale(1.8)'
      }))
    ])
  ]
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() card: ISearchResult

  like: boolean = false;
  likeState: string = 'start'
  cardLike = []
  private cardDeleteSubscription: Subscription;
  private cardSaveSubscription: Subscription;

  constructor(private savedServices: SavedServices) { }

  ngOnInit(): void {
  }

  handleDisLike(id) {
    debugger;
    this.like = !this.like;
    this.likeState = 'start';
    const card_id = this.cardLike.find(item => item.card_id === id)
    this.cardDeleteSubscription = this.savedServices.remove(card_id.id_cardDB).subscribe()
  }

  handleLikeButtonCLick(card) {
    this.like = !this.like
    this.likeState = 'end'
    this.cardSaveSubscription = this.savedServices.saved(card).subscribe(
      (res) => {
        this.cardLike = [{
          card_id: card.card.id,
          id_cardDB: res.name
        }]
      })
      }
  ngOnDestroy() {
    if(this.cardDeleteSubscription){
      this.cardDeleteSubscription.unsubscribe()
    }
    if(this.cardSaveSubscription){
      this.cardSaveSubscription.unsubscribe()
    }
  };
  }




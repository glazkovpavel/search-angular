import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {state, style, trigger} from "@angular/animations";
import {SavedServices} from "../shared/saved.services";
import {ICardInterface} from "../interface/card.interface";
import {ISearchResult} from "../interface/searchResult";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

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
  private cardDeleteSubscription: Subscription;


  constructor(private savedServices: SavedServices) { }

  ngOnInit(): void {
  }

  handleDisLike(id: string) {
    this.like = !this.like
    this.likeState = 'start'
    this.cardDeleteSubscription = this.savedServices.remove(id).subscribe()
  }

  handleLikeButtonCLick(card) {
    this.like = !this.like
    this.likeState = 'end'
    this.savedServices.saved(card).subscribe()
  }
  ngOnDestroy() {
    if(this.cardDeleteSubscription){
      this.cardDeleteSubscription.unsubscribe()
    }
  };

}

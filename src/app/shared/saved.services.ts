import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICardSaveInterface} from "../interface/cardSave.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ISearchResult} from "./api.services";

@Injectable({providedIn: 'root'})
export class SavedServices {
  constructor(private http: HttpClient) {
  }

  public saved(card: { card: ISearchResult }): Observable<ICardSaveInterface[]> {
    //debugger
    return this.http.post<ICardSaveInterface[]>(`${environment.fbDbUrl}/saved-cards.json`, {
      id: card.card.id,
      name: card.card.user.username,
      urls: card.card.urls.regular,
      description: card.card.description
    })
  }

}

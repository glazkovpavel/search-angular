import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICardSaveInterface} from "../interface/cardSave.interface";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SavedServices {
  constructor(private http: HttpClient) {
  }

  public saved(card: { card: ICardSaveInterface }): Observable<ICardSaveInterface> {
    return this.http.post<ICardSaveInterface>(`${environment.fbDbUrl}/saved-cards.json`, {
      id: card.card.id,
      name: card.card.user.name,
      urls: card.card.urls.regular,
      description: card.card.description
    }).pipe(
      catchError(() => of(null))
    ) as Observable<ICardSaveInterface>;
  }
}



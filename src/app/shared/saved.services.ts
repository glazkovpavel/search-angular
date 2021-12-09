import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICardSaveInterface} from "../interface/cardSave.interface";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {IGetCardSaveInterface} from "../interface/getCardSaveInterface";

@Injectable({providedIn: 'root'})
export class SavedServices {
  constructor(private http: HttpClient) {
  }

  public saved(card: { card: ICardSaveInterface }): Observable<ICardSaveInterface> {
    return this.http.post<ICardSaveInterface>(`${environment.fbDbUrl}/saved-cards.json`, {
      id_card: card.card.id,
      name: card.card.user.name,
      urls: card.card.urls.regular,
      description: card.card.description
    }).pipe(
      catchError(() => of(null))
    ) as Observable<ICardSaveInterface>;
  }

  public getAll() {
    return this.http.get<IGetCardSaveInterface>(`${environment.fbDbUrl}/saved-cards.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object.keys(response)
            .map(key => ({
              ...response[key],
              id: key
            }))
        })
      )
  }

  public remove(id: string): Observable<void> {
     return this.http.delete<void>(`${environment.fbDbUrl}/saved-cards/${id}.json`)
  }

}





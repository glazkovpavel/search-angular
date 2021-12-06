import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ICardInterface} from "../interface/card.interface";

export interface ISearchResult {
  id: string,
  urls: {regular: string},
  user: {username: string},
  description: string
}

export interface IGetImageResponse {
  results: ISearchResult[],
  total: number,
  total_pages: number
}
@Injectable()
export class ApiServices {

  public refresh$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  private baseUrl = "https://api.unsplash.com"
  private apiKey = "P2hzfuCuOqvhuqX4A9npRfIU6HLhQKOPLO87eBJKhmI"

  constructor(private http: HttpClient) {
  }

  public getRandom(count = 12): Observable<ISearchResult[]> {
    return this.refresh$.pipe(
      switchMap(() => {
        debugger;
        return this.http.get(`${this.baseUrl}/photos/random?&count=${count}`, {
          headers: new HttpHeaders({
            Authorization: `Client-ID ${this.apiKey}`
          })
        }) as Observable<ISearchResult[]>;
      })
    )
  }

  public onSearch(query, page, per_page = 12): Observable<IGetImageResponse> {
    return this.http.get(`${this.baseUrl}/search/photos?query=${query}&page=${page}&per_page=${per_page}&order_by='popular'`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.apiKey}`
      })
      }) as Observable<IGetImageResponse>
  }

  public getPhotoById(id): Observable<ISearchResult> {
    return this.http.get(`${this.baseUrl}/photos/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Client-ID ${this.apiKey}`
        })
      }) as Observable<ISearchResult>
  }
}

import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
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

  private baseUrl = "https://api.unsplash.com"
  private apiKey = "P2hzfuCuOqvhuqX4A9npRfIU6HLhQKOPLO87eBJKhmI"

  constructor(private http: HttpClient) {
  }

  public getRandom(count = 12): Observable<ISearchResult[]> {
    return this.http.get(`${this.baseUrl}/photos/random?&count=${count}`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.apiKey}`
      })
    }) as Observable<ISearchResult[]>;
  }

  public onSearch(query, page, per_page = 12): Observable<ISearchResult[]> {
    return this.http.get(`${this.baseUrl}/search/photos?query=${query}&page=${page}&per_page=${per_page}&order_by='popular'`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.apiKey}`
      })
      }) as Observable<ISearchResult[]>
  }

  public getPhotoById(id): Observable<ISearchResult[]> {
    return this.http.get(`${this.baseUrl}/photos/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Client-ID ${this.apiKey}`
        })
      }) as Observable<ISearchResult[]>
  }
}

import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ICardInterface} from "../interface/card.interface";

export interface ISearchResult {
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

  public getRandom(count = 12): Observable<any> {
    return this.http.get(`${this.baseUrl}/photos/random?&count=${count}`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.apiKey}`
      })
    }).pipe(map((res) => {
      console.log('getRandom', res)
      return res
      }
    ))
  }

  public onSearch(query, page, per_page = 12): Observable<ISearchResult[]> {
    return this.http.get(`${this.baseUrl}/search/photos?query=${query}&page=${page}&per_page=${per_page}&order_by='popular'`, {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.apiKey}`
      })
      }).pipe(map((res: ISearchResult[]) => {
        console.log('onSearch', res)

      return res
      }
    ))
  }

  public getPhotoById(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/photos/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Client-ID ${this.apiKey}`
        })
      }).pipe(map((response) => {
        console.log(response)
        return response}
    ))
  }
}

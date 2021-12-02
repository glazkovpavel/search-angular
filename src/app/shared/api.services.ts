import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ICardInterface} from "../interface/card.interface";

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
      console.log(res)
      return res
      }
    ))
  }


}

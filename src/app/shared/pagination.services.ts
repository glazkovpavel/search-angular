import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  createPages(pages: any, pagesCount: number, page: number) {

    if(pagesCount > 10) {
      if(page > 5) {
        for (let i = page-4; i <= page+5; i++) {
          pages.push(i)
          if(i === pagesCount || pages.length > 9) break
        }
      }
      else {
        for (let i = 1; i <= 10; i++) {
          pages.push(i)
          if(i === pagesCount) break
        }
      }
    }  else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }
  }


}

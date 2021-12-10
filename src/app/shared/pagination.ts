export function createPages(pages, pagesCount, page) {

  const widerScreenWidth = window.matchMedia("(max-width: 420px)");

  if (widerScreenWidth.matches) {

    if(pagesCount > 7) {
      if(page > 5) {
        for (let i = page-3; i <= page+3; i++) {
          pages.push(i)
          if(i === pagesCount) break
        }
      }
      else {
        for (let i = 1; i <=7; i++) {
          pages.push(i)
          if(i === pagesCount) break
        }
      }
    }  else {
      for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
      }
    }
  } else {

    if(pagesCount > 10) {
      if(page > 5) {
        for (let i = page-4; i <= page+5; i++) {
          pages.push(i)
          if(i === pagesCount) break
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

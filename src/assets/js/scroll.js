function scroll() {
  /*return {
    scrollListener: function (e,fn) {
      if (e) {
        let st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (st + window.innerHeight + 1 > document.body.offsetHeight && document.body.offsetHeight > 0) {
          setTimeout(() => {
            fn()
          },3000)
        }
      }
     /!* let st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (st + window.innerHeight + 1 > document.body.offsetHeight && document.body.offsetHeight > 0) {
        setTimeout(() => {
          fn()
        },3000)
      }*!/
      /!*window.addEventListener('scroll',() => {
        if (e) {
          let st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          if (st + window.innerHeight + 1 > document.body.offsetHeight) {
            setTimeout(() => {
              fn()
            },3000)
          }
        }
      })*!/
    }
  }*/
  return {
    scrollAdd: function (fn) {
      let st = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (st + window.innerHeight + 1 > document.body.offsetHeight && document.body.offsetHeight > 0) {
        setTimeout(() => {
          fn()
        },3000)
      }
    }
  }
}
export default scroll()

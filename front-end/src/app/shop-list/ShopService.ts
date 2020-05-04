

  export  function addNewGood(api, data, token) : any {
      return   new Promise((resolve, reject) => {
        api.addNewGood(data).subscribe(
          data => { },
          error => {
            console.log(error)
              console.log(error.error.code=="token_not_valid")
              if(error.error.code=="token_not_valid"){
                token.refreshTokenSubs().then( newToken => { api.addNewGood(data).subscribe(data => {resolve()})})
              }
          }
        )
      })
    }
    
    export  function getWishList(api, token) : any {
    return   new Promise((resolve, reject) => {
        api.getWishList().subscribe(
            data => {           
                resolve(data) 
            },
            error => {
              if(error.error.code!="token_not_valid"){
                console.log(error)
              }
              if(error.error.code=="token_not_valid"){
                token.refreshTokenSubs().then( newToken => { api.getWishList().subscribe(data => {resolve(data)})})
              }
            }
        )
    })
    }


    export  function addNewGoodChild(api, data, token) : any {
      return   new Promise((resolve, reject) => {
        api.addNewGoodChild(data).subscribe(
          data => {
          },
          error => {
            if(error.error.code!="token_not_valid"){
              console.log(error)
            }
            if(error.error.code=="token_not_valid"){
              token.refreshTokenSubs().then( newToken => { api.addNewGoodChild(data).subscribe(data => {resolve()}) } )
            }
          }
        )
      })
      }
  
      export  function getWishListChild(api, token) : any {
      return   new Promise(function (resolve, reject) {
          api.getWishListChild().subscribe(
              data => {           
                  resolve(data) 
              },
              error => {
                if(error.error.code!="token_not_valid"){
                  console.log(error)
                }
                if(error.error.code=="token_not_valid"){
                  token.refreshTokenSubs().then( newToken => { api.getWishListChild().subscribe(data => {resolve(data)})})
                }
              }
          )
      })
      }

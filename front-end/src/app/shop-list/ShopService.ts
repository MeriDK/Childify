

  export  function getWishList(api, token, router) : any {
      return item(api, api.getWishList, null, token, router)
    }

    export  function getOrderList(api, token, router) : any {
      return item(api, api.getOrderList, null, token, router)
    }

    export  function getReceivedList(api, token, router) : any {
      return item(api, api.getReceivedList, null, token, router)
    }

    export  function addItem(api, data, token, router) : any {
      return item(api, api.addItem, data, token, router)
    }

    export  function confirmItem(api, data, token, router) : any {
      return item(api, api.confirmItem, data, token, router)
    }
    export  function buyItem(api, data, token, router) : any {
      return item(api, api.buyItem, data, token, router)
    }
    export  function returnItem(api, data, token, router) : any {
      return item(api, api.returnItem, data, token, router)
    }


    export  function editItem(api, data, token, router) : any {
      return item(api, api.editItem, data, token, router)
    }

    export  function deleteItem(api, data, token, router) : any {
      return item(api, api.deleteItem, data, token, router)
    }

    function item (api, func, data, token, router) : any {
      if(data) {
        return   new Promise((resolve, reject) => {
          func(api, data).subscribe(
            data => { 
              resolve(data)
            },
            error => {
              console.log(error)
                console.log(error.error.code=="token_not_valid")
                if(error.error.code=="token_not_valid"){
                  token.refreshTokenSubs().then( newToken => { func(api, data).subscribe(data => {resolve(data)})}).catch(error=>{router.navigate(['/login']);})
                }
                if(error.error.code=="bad_authorization_header"){
                  router.navigate(['/login']);
                }
            }
          )
        })
      } else {
        return   new Promise((resolve, reject) => {
          func(api).subscribe(
            data => { 
              resolve(data)
            },
            error => {
              console.log(error)
                console.log(error.error.code=="token_not_valid")
                if(error.error.code=="token_not_valid"){
                  token.refreshTokenSubs().then( newToken => { func(api).subscribe(data => {resolve(data)})}).catch(error=>{router.navigate(['/login']);})
                }
                if(error.error.code=="bad_authorization_header"){
                  router.navigate(['/login']);
                }
            }
          )
        })
      }
    }


    





    
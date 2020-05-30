

  export  function getWishList(api, token) : any {
      return item(api, api.getWishList, null, token)
    }

    export  function getOrderList(api, token) : any {
      return item(api, api.getOrderList, null, token)
    }

    export  function getReceivedList(api, token) : any {
      return item(api, api.getReceivedList, null, token)
    }

    export  function addItem(api, data, token) : any {
      return item(api, api.addItem, data, token)
    }

    export  function confirmItem(api, data, token) : any {
      return item(api, api.confirmItem, data, token)
    }
    export  function buyItem(api, data, token) : any {
      return item(api, api.buyItem, data, token)
    }
    export  function returnItem(api, data, token) : any {
      return item(api, api.returnItem, data, token)
    }


    export  function editItem(api, data, token) : any {
      return item(api, api.editItem, data, token)
    }

    export  function deleteItem(api, data, token) : any {
      return item(api, api.deleteItem, data, token)
    }

    function item (api, func, data, token) : any {
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
                  token.refreshTokenSubs().then( newToken => { func(api, data).subscribe(data => {resolve(data)})})
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
                  token.refreshTokenSubs().then( newToken => { func(api).subscribe(data => {resolve(data)})})
                }
            }
          )
        })
      }
    }


    





    
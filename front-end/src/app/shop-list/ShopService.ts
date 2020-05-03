

  export  function addNewGood(api, data) : void {
      api.addNewGood(data).subscribe(
        data => {
        },
        error => {
          console.log(error)
        }
      )
    }
    
    export  function getWishList(api) : any {
    return   new Promise(function (resolve, reject) {
        api.getWishList().subscribe(
            data => {           
                resolve(data) 
            },
            error => {
                console.log(error)
            }
        )
    })
    }


    export  function addNewGoodChild(api, data) : void {
        api.addNewGoodChild(data).subscribe(
          data => {
          },
          error => {
            console.log(error)
          }
        )
      }
  
      export  function getWishListChild(api) : any {
      return   new Promise(function (resolve, reject) {
          api.getWishListChild().subscribe(
              data => {           
                  resolve(data) 
              },
              error => {
                  console.log(error)
              }
          )
      })
      }

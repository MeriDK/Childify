
      /*     registration-add-create-family      */


      ///check errors
      ///button pause

      export function createNewFamily(api, data) : void {
        api.createNewFamily(data).subscribe(
          data => {},
          error => {
            console.log(error)
            if(error.code=="token_not_valid" && error['messages'][0]['message']=="Token 'exp' claim has expired"){
              api.refreshToken()
            }
          }
        )
      }

      export function connectToFamily(api, data) : void {
        api.connectToFamily(data).subscribe(
          data => {},
          error => {
            console.log(error)
            console.log(error.error.code=="token_not_valid")
            if(error.error.code=="token_not_valid"){
              api.refreshTokenSubs()
            }
          }
        )
      }



      export function registerNewUser(api, token,  data) : void {
        api.registerNewUser(data).subscribe(
          data => {
            token.setCookie(data)
          },
          error => {
            console.log(error)
          }
        )
      }

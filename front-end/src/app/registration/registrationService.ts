export default {

      registerNewUser(api, data) : void {
        api.registerNewUser(data).subscribe(
          data => {
              api.setCookie(data)
          },
          error => {
            console.log(error)
          }
        )
      }
}
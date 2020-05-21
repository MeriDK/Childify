export function createNewFamily(api, token, data, router): any {
  return new Promise((resolve, reject) => {
    api.createNewFamily(data).subscribe(
    data => {
      router.navigate(['/login']);
    },
    error => {
      console.log(error);
      if (error.code === 'token_not_valid' && error.messages[0].message === 'Token \'exp\' claim has expired'){
        token.refreshTokenSubs().then( newToken => { api.createNewFamily(data).subscribe(
          data => {
            router.navigate(['/login']);
            resolve();
          }
        ); });
      }
    }
  );
  });
}

export function connectToFamily(api, token, data, router): any {
  return   new Promise((resolve, reject) => {
    api.connectToFamily(data).subscribe(
    data => {
      router.navigate(['/login']);
    },
    error => {
      console.log(error);
      console.log(error.error.code === 'token_not_valid');
      if (error.error.code === 'token_not_valid'){
        token.refreshTokenSubs().then( newToken => {api.connectToFamily(data).subscribe(
          data => {
            router.navigate(['/login']);
            resolve();
          }
        ); });
      }
    }
  );
  });
}

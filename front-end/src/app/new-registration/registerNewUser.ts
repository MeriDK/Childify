export function registerNewUser(api, token,  data, router): void {
  api.registerNewUser(data).subscribe(
    data => {
      token.setCookie(data);
      router.navigate(['/connect-family']);
    },
    error => {
      console.log(error);
    }
  );
}

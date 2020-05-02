import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  providers: [LoginService]
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {
    this.loginService.validate({token: this.cookieService.get('refresh')})
      .pipe(first())
      .subscribe(
        response => {
          this.forwardToFamily();
        }
      );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // after login
  forwardToFamily() {
    this.loginService.getFamily({ headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('access'))})
      .pipe(first())
      .subscribe(
        response => {
          this.router.navigate(['/family']);
        },
        // error 405 when user isn't connected to family
        error => this.router.navigate(['/connect-family'])
      );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if invalid
    if (this.loginForm.invalid) { return; }

    this.loading = true;

    this.loginService.loginUser(this.loginForm.value)
      .pipe(first())
      .subscribe(
        response => {
          // @ts-ignore
          this.cookieService.set('access', response.access);
          // @ts-ignore
          this.cookieService.set('refresh', response.refresh);
          this.forwardToFamily();
        },
        error => {
          this.error = error.message;
          this.loading = false;
        }
      );
  }
}

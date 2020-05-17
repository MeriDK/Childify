import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.loginService.validate({token: this.tokenService.getRefresh()})
      .pipe(first())
      .subscribe(
        response => {
          this.forwardToFamily();
        }
      );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // after login
  forwardToFamily() {
    this.loginService.getFamily({ headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.tokenService.getAccess())})
      .pipe(first())
      .subscribe(
        response => {
          this.router.navigate(['/family']);
        },
        // error 412 - user isn't connected to family
        error => {
          if (error.status === 412) {
            this.router.navigate(['/connect-family']);
          }
        }
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
          this.tokenService.setCookie({'access':response.access, 'refresh':response.refresh})
          this.forwardToFamily();
        },
        error => {
          this.error = error.message;
          this.loading = false;
        }
      );
  }
}

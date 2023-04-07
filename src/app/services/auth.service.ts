import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ResponseBody } from './response-body';
import { CommonService } from './common.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.API_URL;
  formErrors: any;
  submitted: boolean = false;
  errorMessage: string = '';
  user: any; // Save logged in user data
  constructor(
    private service: CommonService,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) { }

  public login(username: any, password: any) {
    return this.http
      .post<ResponseBody>(
        this.url + 'auth/login',
        JSON.stringify({
          username,
          password
        }),
      ).subscribe({
        next: result => {
          if (result.success) {
            if (environment.API_KEY == result['data']['token']) {
              sessionStorage.setItem('loghash', this.service.encrypt("1"));
              this.router.navigate(['account']);
              this.toastr.success('User logged in successfully!');
            } else {
              this.toastr.error('Username or password is incorrect.');
              sessionStorage.setItem('loghash', this.service.encrypt("0"));
              this.errorMessage = 'Username or password is incorrect.';
              this.submitted = false;
            }
          } else {
            this.toastr.error('Username or password is incorrect.');
            sessionStorage.setItem('loghash', this.service.encrypt("0"));
            this.errorMessage = 'Username or password is incorrect.';
            this.submitted = false;
          }
        },
        error: error => {
          this.submitted = false;
          if (error.status === 422) {
            this.resetFormErrors();
            this.setFormErrors(JSON.parse(error.data.message));
            this.toastr.error(JSON.parse(error.data.message));
          } else {
            this.toastr.error('Username or password is incorrect.');
            this.errorMessage = error.data;
          }
        }
      });
  }


  logout(): void {
    sessionStorage.removeItem('loghash');
    sessionStorage.removeItem('idhash');
    this.router.navigate(['']);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    var loghash = sessionStorage.getItem('loghash')!;
    if (loghash) {
      const value = this.service.decrypt(loghash);
      return value !== "0" ? true : false;
    }
    return false;
  }

  unauthorizedAccess(error: any): void {
    this.logout();
    this.router.navigate(['/login'], { queryParams: { error: error.data.message } });
  }

  setFormErrors(errorFields: any): void {
    for (const key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) {
        continue;
      }

      const message = errorFields[key];
      this.formErrors[key].valid = false;
      this.formErrors[key].message = message;
    }
  }

  resetFormErrors(): void {
    this.formErrors = {
      username: { valid: true, message: '' },
      password: { valid: true, message: '' }
    };
  }

}

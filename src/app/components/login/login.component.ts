import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { environment } from 'src/environments/environment.development';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  errorMessage: string = '';
  formErrors: any;
  isLogging: boolean = false;

  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private service: CommonService,
    private toastr: ToastrService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
      },
      // {
      //   validators: [Validation.match('password', 'confirmPassword')]
      // }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.isLogging = true;
    if (this.loginForm.invalid) {
      this.isLogging = false;
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: result => {
        if (result.success) {
          if (environment.API_KEY == result['data']['token']) {
            sessionStorage.setItem('loghash', this.service.encrypt("1"));
            this.router.navigate(['account']);
            this.toastr.success('User logged in successfully!');
            this.isLogging = false;
          } else {
            this.toastr.error('Username or password is incorrect.');
            sessionStorage.setItem('loghash', this.service.encrypt("0"));
            this.errorMessage = 'Username or password is incorrect.';
            this.submitted = false;
            this.isLogging = false;
          }
        } else {
          this.toastr.error('Username or password is incorrect.');
          sessionStorage.setItem('loghash', this.service.encrypt("0"));
          this.errorMessage = 'Username or password is incorrect.';
          this.submitted = false;
          this.isLogging = false;
        }
      },
      error: error => {
        this.submitted = false;
        if (error.status === 422) {
          this.resetFormErrors();
          this.setFormErrors(JSON.parse(error.data.message));
          this.toastr.error(JSON.parse(error.data.message));
          this.isLogging = false;
        } else {
          this.toastr.error('Username or password is incorrect.');
          this.errorMessage = error.data;
          this.isLogging = false;
        }
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
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

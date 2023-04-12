import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ResponseBody } from './response-body';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.API_URL;
  submitted: boolean = false;
  user: any; // Save logged in user data
  constructor(
    private service: CommonService,
    private http: HttpClient,
    public router: Router,
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
      );
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
}

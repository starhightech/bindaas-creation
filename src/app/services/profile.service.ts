import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiURL = environment.API_URL;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.API_KEY,
    })
  }

  constructor(private httpClient: HttpClient, private service: CommonService) { }

  update(profile: any): Observable<any> {
    var data = {
      username: profile.username,
      mobile: profile.mobile ?? '',
      first_name: profile.first_name ?? '',
      middle_name: profile.middle_name ?? '',
      last_name: profile.last_name ?? '',
      display_name: profile.display_name ?? '',
      gender: profile.gender ?? '',
      email: profile.email,
      location: profile.location
    }
    return this.httpClient.post<any>(this.apiURL + 'profile/update', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

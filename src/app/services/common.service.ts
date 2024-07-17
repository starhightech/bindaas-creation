import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private url = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.API_KEY,
    });
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get(
      this.url + 'profile/me?expand=business',
      {
        headers: headers
      }
    ).pipe(catchError(this.handleError)
    )
  }

  getBusiness(): Observable<any> {
    return this.httpClient.get(
      this.url + 'businesses/' + environment.APP_ID,
    ).pipe(catchError(this.handleError)
    )
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(
      this.url + 'businesses/items?id=' + environment.APP_ID,
    ).pipe(catchError(this.handleError)
    )
  }

  getReviews(): Observable<any> {
    return this.httpClient.get(
      this.url + 'businesses/reviews?id=' + environment.APP_ID,
    ).pipe(catchError(this.handleError)
    )
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  getCategoriesByHeadcat(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get(
      this.url + 'profile/me?expand=business,business.categories',
      {
        headers: headers
      }
    ).pipe(catchError(this.handleError)
    )
  }

  getBrands(): Observable<any> {
    return this.httpClient.get(
      this.url + 'brands',
    ).pipe(catchError(this.handleError)
    )
  }

  getCities(): Observable<any> {
    return this.httpClient.get(
      this.url + 'cities',
    ).pipe(catchError(this.handleError)
    )
  }

  contact(contact: any, id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    var data = {
      business_id: id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      content: contact.message
    }
    return this.httpClient.post(
      this.url + 'business-contacts', JSON.stringify(data),
      {
        headers: headers
      }
    ).pipe(catchError(this.handleError)
    )
  }
}

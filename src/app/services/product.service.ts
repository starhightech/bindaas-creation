import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public id:any = environment.APP_ID;
  private apiURL = environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.API_KEY,
    })
  }

  constructor(private httpClient: HttpClient, private service: CommonService) { }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'products?expand=category&sort=id&business_id=' + this.id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(slug: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'products?slug=' + slug)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getReviews(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'products/reviews?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getImages(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'products/images?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createReview(review: any, rating: any, id: any): Observable<any> {
    var data = {
      product_id: id,
      rating: rating,
      name: review.name,
      email: review.email,
      review: review.review
    };
    return this.httpClient.post<any>(this.apiURL + 'product-reviews', JSON.stringify(data), this.httpOptions)
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

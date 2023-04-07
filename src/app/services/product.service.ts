import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Products } from '../interface/product';
import { environment } from 'src/environments/environment.development';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public id: any;
  private apiURL = environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.API_KEY,
    })
  }

  constructor(private httpClient: HttpClient, private service: CommonService) { }

  getAll(): Observable<any> {
    var value = sessionStorage.getItem('idhash')!;
    this.id = this.service.decrypt(value);
    return this.httpClient.get<any>(this.apiURL + 'products?expand=category&sort=id&business_id=' + this.id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(product: any, type: any, files: File[]): Observable<Products> {
    var httpOptions = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': 'Bearer ' + environment.API_KEY,
      })
    }
    var value = sessionStorage.getItem('idhash')!;
    this.id = this.service.decrypt(value);
    var hasDiscount = "0";
    if (product.has_discount) {
      hasDiscount = "1";
    }
    var formData = new FormData();
    formData.append('Product[business_id]', this.id);
    formData.append('Product[media_id]', '1');
    formData.append('Product[title]', product.title);
    formData.append('Product[category_id]', product.category_id);
    formData.append('Product[brand]', product.brand ?? '');
    formData.append('Product[price]', product.price ?? '');
    formData.append('Product[content]', product.content ?? '');
    formData.append('Product[condition]', product.condition ?? '');
    formData.append('Product[status]', product.status);
    formData.append('Product[has_discount]', hasDiscount);
    formData.append('Product[discount]', product.discount ?? '');
    if (type == "Product") {
      formData.append('Product[brand]', product.brand ?? '');
      formData.append('Product[condition]', product.condition ?? '');
    }
    files.forEach((file: any, index) => {
      formData.append('files[' + index + ']', file);
    });
    console.log(formData);
    return this.httpClient.post<any>(this.apiURL + 'products', formData, httpOptions)
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

  update(id: any, product: any, type: any): Observable<any> {
    var value = sessionStorage.getItem('idhash')!;
    this.id = this.service.decrypt(value);
    var data;
    if (type == "Product") {
      data = {
        "Product[title]": product.title,
        "Product[category_id]": product.category_id,
        "Product[brand]": product.brand,
        "Product[price]": product.price,
        "Product[content]": product.content,
        "Product[condition]": product.condition,
        "Product[status]": product.status,
        "Product[has_discount]": product.has_discount,
        "Product[discount]": product.discount,
      }
    } else {
      data = {
        "Product[title]": product.title,
        "Product[category_id]": product.category_id,
        "Product[price]": product.price,
        "Product[content]": product.content,
        "Product[status]": product.status,
        "Product[has_discount]": product.has_discount,
        "Product[discount]": product.discount,
      }
    }
    return this.httpClient.put<any>(this.apiURL + 'products/' + id, JSON.stringify(product), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: any) {
    return this.httpClient.delete<any>(this.apiURL + 'products/' + id, this.httpOptions)
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

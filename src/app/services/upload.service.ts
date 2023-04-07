import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiURL = environment.API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data',
      'Authorization': 'Bearer ' + environment.API_KEY,
    })
  }

  constructor(private httpClient: HttpClient, private service: CommonService) { }

  public uploadfileBusiness(file: File) {
    var value = sessionStorage.getItem('idhash')!;
    const id = this.service.decrypt(value);

    let formParams = new FormData();
    formParams.append('file', file)
    return this.httpClient.post(this.apiURL + 'businesses/media?id=' + id, formParams, this.httpOptions)
  }

  public uploadfileProfile(file: File) {
    var value = sessionStorage.getItem('userhash')!;
    const id = this.service.decrypt(value);

    let formParams = new FormData();
    formParams.append('file', file)
    return this.httpClient.post(this.apiURL + 'profile/media?id=' + id, formParams, this.httpOptions)
  }
}

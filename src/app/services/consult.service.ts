import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/consults`;

  constructor(private http: HttpClient) { }

  saveTransactional(){
    ///
  }
}

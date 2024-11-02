import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';
import { Specialty } from '../model/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends GenericService<Specialty> {

  private specialtyChange: Subject<Specialty[]> = new Subject<Specialty[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialties`)
  }

  setSpecialtyChange(data: Specialty[]){
    this.specialtyChange.next(data);
  }

  getSpecialtyChange(){
    return this.specialtyChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}

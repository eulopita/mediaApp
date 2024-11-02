import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Exam } from '@model/exam';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam>{
  
  private examChange: Subject<Exam[]> = new Subject<Exam[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/exams`)
  }

  setExamChange(data : Exam[]){
    this.examChange.next(data);
  }

  getExamChange(){
    return this.examChange.asObservable();
  }

  setMessageChange(data : string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }


}

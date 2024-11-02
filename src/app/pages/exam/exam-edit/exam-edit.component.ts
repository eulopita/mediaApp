import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Exam } from '@model/exam';
import { ExamService } from '@services/exam.service';
import { MaterialModule } from 'app/material/material.module';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-edit',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './exam-edit.component.html',
  styleUrl: './exam-edit.component.css'
})
export class ExamEditComponent implements OnInit { 

  private fb = inject(FormBuilder);
  private examService = inject(ExamService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  formExam: FormGroup = new FormGroup({}); 
  id: number;
  isEdit: boolean;
  exam!: Exam;

  constructor() { 
    this.exam = new Exam();
  }

  ngOnInit(): void {

    this.initForm(this.exam);

    this.id = Number(decodeURIComponent(atob(this.activatedRoute.snapshot.params['id'])));

    if (this.id && this.id != 0) {
      this.edit(this.id);
    }   

  } 


  initForm(exam: Exam): void {
    this.formExam = this.fb.group({      
      'nameExam': [exam.nameExam || '', [Validators.required, Validators.maxLength(50)]],     
      'descriptionExam': [exam.descriptionExam || '',  [Validators.required, Validators.maxLength(150)]]
    });
  }


  edit(id: number) {
      this.examService.findById(id).subscribe(data => {        
        this.exam = data;
        this.isEdit = true;
        this.initForm(this.exam);
      });    
  }

  get f() {
    return this.formExam.controls;
  }


  operate() {

    if (this.formExam.invalid) {
      return;
    }

    this.exam = this.formExam.value; 
    this.exam.idExam = this.id;

    if (this.isEdit) {
      //UPDATE     
      this.examService.update(this.id, this.exam).subscribe(() => {
        this.examService.findAll().subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!');
        });
      });
    } else {
      //INSERT      
      this.examService.save(this.exam)
        .pipe(switchMap(() => this.examService.findAll()))
        .subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('CREATED!');
        });
    }

    this.router.navigate(['pages/exam']);
  }

 

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Exam } from '@model/exam';
import { ExamService } from '@services/exam.service';
import { AppConfirmService } from 'app/commons/app-confirm.service';
import { MaterialModule } from 'app/material/material.module';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit {

  dataSource: MatTableDataSource<Exam>;
  columnsDefinitions = [
    { def: 'idExam', label: 'idExam', hide: true },
    { def: 'nameExam', label: 'nameExam', hide: false },
    { def: 'descriptionExam', label: 'descriptionExam', hide: false },   
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private examService: ExamService,
    private router: Router,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.examService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.examService.getExamChange().subscribe(data => this.createTable(data));
    this.examService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'right' }));

  }

  createTable(data: Exam[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }  


  new() {
    let url = 'pages/exam/register';
    this.irUrl(url, 0);
  }


  edit(idExam: number) {
    let url = 'pages/exam/register';
    this.irUrl(url, idExam);
  }



  delete(exam: Exam) {

    const messageContent = `Are you sure to eliminate the Exam: <strong>${exam.nameExam}</strong>?`;

    this.confirmService.confirmar(
      {
        title: 'Delete',
        message: messageContent
      }).subscribe(response => {

        if (response) {

          this.examService.delete(exam.idExam)
            .pipe(switchMap(() => this.examService.findAll()))
            .subscribe(data => {
              this.examService.setExamChange(data);
              this.examService.setMessageChange('DELETED!');
            });
        }
      });
  }

  //Navegacion
  irUrl(url: string, id: number): void {

    let idExam = encodeURIComponent(btoa(id + ''));   

    let link = `${url}/${idExam}`;

    this.router.navigateByUrl(link).then((e) => {
      if (e) {
        console.log('La navegación es correcta!');
      } else {
        console.log('Error en la navegación!');
      }
    });
  }

}

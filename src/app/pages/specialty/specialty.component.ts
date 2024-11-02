import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '@model/specialty';
import { SpecialtyService } from '@services/specialty.service';
import { AppConfirmService } from 'app/commons/app-confirm.service';
import { AppConfirmComponent } from 'app/commons/app-confirm/app-confirm.component';
import { MaterialModule } from 'app/material/material.module';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [MaterialModule, AppConfirmComponent],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent implements OnInit{

  dataSource: MatTableDataSource<Specialty>;

  columnsDefinitions = [
    { def: 'idSpecialty', label: 'idSpecialty', hide: true },
    { def: 'nameSpecialty', label: 'nameSpecialty', hide: false },
    { def: 'descriptionSpecialty', label: 'descriptionSpecialty', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private specialtyService: SpecialtyService,
    private confirmService: AppConfirmService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.specialtyService.findAll().subscribe(data => this.createTable(data));

    this.specialtyService.getSpecialtyChange().subscribe(data => this.createTable(data));
    this.specialtyService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Specialty[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(specialty?: Specialty) {
    this._dialog.open(SpecialtyDialogComponent, {
      width: '750px',
      data: specialty
    });
  }

  delete(specialty: Specialty) {
   
    const messageContent = `Are you sure to eliminate the Specialty: <strong>${specialty.nameSpecialty}</strong>?`;

    this.confirmService.confirmar(
      {
        title: 'Delete',
        message: messageContent
      }).subscribe(response => {

        if (response) {

          this.specialtyService.delete(specialty.idSpecialty)
            .pipe(switchMap(() => this.specialtyService.findAll()))
            .subscribe(data => {
              this.specialtyService.setSpecialtyChange(data);
              this.specialtyService.setMessageChange('DELETED!');
            });
        }
      });
  }

}

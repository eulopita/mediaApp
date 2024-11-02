import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Medic } from '../../model/medic';
import { MedicService } from '../../services/medic.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmComponent } from '../../commons/app-confirm/app-confirm.component';
import { AppConfirmService } from '../../commons/app-confirm.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic',
  standalone: true,
  imports: [MaterialModule, AppConfirmComponent],
  templateUrl: './medic.component.html',
  styleUrl: './medic.component.css'
})
export class MedicComponent implements OnInit {

  dataSource: MatTableDataSource<Medic>;

  columnsDefinitions = [
    { def: 'idMedic', label: 'idMedic', hide: true },
    { def: 'primaryName', label: 'primaryName', hide: false },
    { def: 'surname', label: 'surname', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private medicService: MedicService,
    private confirmService: AppConfirmService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medicService.findAll().subscribe(data => this.createTable(data));

    this.medicService.getMedicChange().subscribe(data => this.createTable(data));
    this.medicService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Medic[]) {
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

  openDialog(medic?: Medic) {
    this._dialog.open(MedicDialogComponent, {
      width: '750px',
      data: medic
    });
  }

  delete(medic: Medic) {
    /*this._dialog.open(MedicDeleteDialogComponent, {
      width: '200px',
      data: id
    })*/
    const messageContent = `Are you sure to eliminate the Medic: <strong>${medic.primaryName}</strong>?`;

    this.confirmService.confirmar(
      {
        title: 'Delete',
        message: messageContent
      }).subscribe(response => {

        if (response) {

          this.medicService.delete(medic.idMedic)
            .pipe(switchMap(() => this.medicService.findAll()))
            .subscribe(data => {
              this.medicService.setMedicChange(data);
              this.medicService.setMessageChange('DELETED!');
            });
        }
      });
  }
  
}

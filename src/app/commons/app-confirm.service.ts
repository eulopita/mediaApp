import { inject, Injectable } from '@angular/core';
import { AppConfirmComponent } from './app-confirm/app-confirm.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';


interface ConfirmData {
  title?: string,
  message?: string
}


@Injectable({
  providedIn: 'root'
})
export class AppConfirmService {

  dialogRef!: MatDialogRef<AppConfirmComponent>;

  private dialog = inject(MatDialog);

  //constructor(private dialog: MatDialog) { }

  public confirmar(data: ConfirmData = {}): Observable<boolean> {
    this.dialogRef = this.dialog.open(AppConfirmComponent, {
      width: '380px',
      disableClose: true,
      data: { title: data.title, message: data.message }
    });
    return this.dialogRef.afterClosed();
  }

}

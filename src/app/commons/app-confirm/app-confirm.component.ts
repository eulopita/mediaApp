import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';


@Component({
  selector: 'app-app-confirm',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './app-confirm.component.html',
  styleUrl: './app-confirm.component.css'
})
export class AppConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<AppConfirmComponent>){}
}

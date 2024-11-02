import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medic-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medic-delete-dialog.component.html',
  styleUrl: './medic-delete-dialog.component.css'
})
export class MedicDeleteDialogComponent {

  constructor(){}

}

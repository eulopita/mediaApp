import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Specialty } from '@model/specialty';
import { SpecialtyService } from '@services/specialty.service';
import { MaterialModule } from 'app/material/material.module';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './specialty-dialog.component.html',
  styleUrl: './specialty-dialog.component.css'
})
export class SpecialtyDialogComponent implements OnInit {

  specialty: Specialty;  

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Specialty,
    private _dialogRef: MatDialogRef<SpecialtyDialogComponent>,    
    private specialtyService: SpecialtyService
  ){}

  ngOnInit(): void {
      this.specialty = {... this.data}      
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.specialty != null && this.specialty.idSpecialty > 0){
      //UPDATE
      this.specialtyService.update(this.specialty.idSpecialty, this.specialty)
        .pipe(switchMap( () => this.specialtyService.findAll()))
        .subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.specialtyService.save(this.specialty)
      .pipe(switchMap( () => this.specialtyService.findAll()))
      .subscribe(data => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('CREATED!');
      });
    }

    this.close();
  }

}

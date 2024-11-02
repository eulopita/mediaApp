import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-consult-wizard',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './consult-wizard.component.html',
  styleUrl: './consult-wizard.component.css'
})
export class ConsultWizardComponent {

}

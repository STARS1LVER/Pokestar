import { Component } from '@angular/core';
import { ButtonsHomeComponent } from '../../../shared/buttons-home/buttons-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ButtonsHomeComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default  class HomeComponent {

}

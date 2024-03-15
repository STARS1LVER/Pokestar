import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponentComponent } from '../shared/header-component/header-component.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HeaderComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}

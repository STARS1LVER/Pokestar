import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponentComponent } from '../shared/header-component/header-component.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HeaderComponentComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

}

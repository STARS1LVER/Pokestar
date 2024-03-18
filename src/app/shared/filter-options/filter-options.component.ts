import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-options',
  standalone: true,
  imports: [],
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent {

  public filterOptions: string | undefined


  @Output() public filterChange = new EventEmitter<string | undefined >()

  public changeFilter(filter: string | undefined){

    this.filterOptions = filter;

    console.log(this.filterOptions,'desde event filter')
    this.filterChange.emit( this.filterOptions )


  }

}

import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-pokemon.component.html',
  styleUrl: './pagination-pokemon.component.css'
})
export class PaginationPokemonComponent {

  // Properties:
  public page: number = 1 ;

  @Output() public pageChange = new EventEmitter<number>()

  public changePage( page: number ) {

    this.page = page
    console.log('desde event', this.page)
    this.pageChange.emit(this.page )

  }



}

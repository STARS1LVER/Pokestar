import { CommonModule } from '@angular/common';
import { Component, Input, Output, input } from '@angular/core';
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
   @Input() public page: number = 1 ;
  @Input()  public total: number = 20;


  @Output() public pageChange = new EventEmitter<number>()

  public get maxPage(): number {
    return Math.ceil(this.total / this.page);
  }


  public changePage( page: number ) {

    console.log( this.maxPage , "page:", page )
    this.page = page
    if( this.page < this.maxPage ){
      this.pageChange.emit(this.page )
    }

  }





}

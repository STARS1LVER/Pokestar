import { Component, OnInit, inject } from '@angular/core';
import { Result } from '../../../interfaces/poke-list';
import { PokemonService } from '../../../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from '../../../shared/card-pokemon/card-pokemon.component';
import { PaginationPokemonComponent } from '../../../shared/pagination-pokemon/pagination-pokemon.component';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [CommonModule, CardPokemonComponent, PaginationPokemonComponent],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css'
})
export default class ListPokemonComponent implements OnInit {

  // * Properties:
  public listPokemon!: Result[];
  public currentPage: number = 1;


  // Inyectamos dependencias!
  private pokemonService = inject( PokemonService );


  ngOnInit(): void {
    this.getPokemonList(this.currentPage)
  }


  public getPokemonList(currentPage: number){
    console.log(currentPage,'desde get')
    this.pokemonService.getListPokemon(currentPage)
    .subscribe({
      next: ( data ) => {
        this.listPokemon = data
        console.log( this.listPokemon )
      },
      error: ( error ) => {
        console.log(error)
      }
    })


  }

  public onPageChange( page: number ){
    this.currentPage = page

    if( this.currentPage <= 0 ) return
    console.log(this.currentPage, 'current')
    console.log( page )
    this.getPokemonList( page )
  }


}

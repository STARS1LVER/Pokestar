import { Component, OnInit, inject } from '@angular/core';
import { Result } from '../../../interfaces/poke-list';
import { PokemonService } from '../../../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from '../../../shared/card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [CommonModule, CardPokemonComponent],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css'
})
export default class ListPokemonComponent implements OnInit {

  // * Properties:
  public listPokemon!: Result[];


  // Inyectamos dependencias!
  private pokemonService = inject( PokemonService );


  ngOnInit(): void {
    this.getPokemonList()
  }


  public getPokemonList(){
    this.pokemonService.getListPokemon()
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


}

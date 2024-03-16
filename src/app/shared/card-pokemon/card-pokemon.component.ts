import { Component, Input, OnInit, inject } from '@angular/core';
import { Result } from '../../interfaces/poke-list';
import { ImagePokePipe } from '../../pipes/pipes.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon-interface';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [ImagePokePipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent implements OnInit {

  public pokemon!: Pokemon

  @Input({
    required: true
  }) public pokemonData!: Result

  private pokemonService = inject(PokemonService)

  ngOnInit(): void {
    this.getInfoPokemon()
    if( !this.pokemonData ) throw new Error('Property is required');
  }

  public extraerId( url: string): string {
    let splitUrl = url.split('/');
    let numero = splitUrl[splitUrl.length - 2];
    return numero;
  }


  public getInfoPokemon(){
    this.pokemonService.getPokemonById( this.extraerId( this.pokemonData.url )  )
    .subscribe({
      next: ( data ) => {
        this.pokemon = data
      }
    })
  }

}




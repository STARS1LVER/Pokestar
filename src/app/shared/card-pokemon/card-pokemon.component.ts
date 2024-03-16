import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
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
export class CardPokemonComponent implements OnInit, OnChanges {

  public pokemon!: Pokemon

  @Input({
    required: true
  }) public pokemonData!: Result

  private pokemonService = inject(PokemonService)


  ngOnChanges(changes: SimpleChanges): void {
    if( changes ){
      this.getInfoPokemon()
    }
  }

  ngOnInit(): void {
    this.getInfoPokemon()
    console.log(this.pokemonData)
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




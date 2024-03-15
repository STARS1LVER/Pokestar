import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/poke-list';
import { ImagePokePipe } from '../../pipes/pipes.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [ImagePokePipe, TitleCasePipe],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent implements OnInit {

  @Input({
    required: true
  }) public pokemonData!: Result

  ngOnInit(): void {
    if( !this.pokemonData ) throw new Error('Property is required');
  }

  public extraerId( url: string): string {
    let splitUrl = url.split('/');
    let numero = splitUrl[splitUrl.length - 2];
    return numero;

  }

}




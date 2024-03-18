import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Result } from '../../interfaces/poke-list';
import { ImagePokePipe } from '../../pipes/imageCard.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon-interface';
import { RouterModule } from '@angular/router';
import { ImageNullPipe } from '../../pipes/imagenNull.pipe';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [
    ImagePokePipe,
    TitleCasePipe,
    UpperCasePipe,
    RouterModule,
    ImageNullPipe  ],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent implements OnInit {


  @Input({
    required: true
  }) public pokemon!: Pokemon

  private pokemonService = inject(PokemonService)




  ngOnInit(): void {
    // console.log(this.pokemonData)
    if( !this.pokemon ) throw new Error('Property is required');
  }



}




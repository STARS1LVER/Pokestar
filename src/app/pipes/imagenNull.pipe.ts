import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon-interface';

@Pipe({
  name: 'ImageNull',
  standalone: true
})
export class ImageNullPipe implements PipeTransform {

  transform(pokemon: Pokemon): unknown {

    if(pokemon.sprites.other?.dream_world?.front_default === null ){
      return pokemon.sprites.front_default
    } else {
      return pokemon.sprites.other?.dream_world?.front_default

    }

  }

}

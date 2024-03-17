import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon-interface';

@Pipe({
  name: 'ImageInfo',
  standalone: true
})
export class ImageInfoPipe implements PipeTransform {

  transform(pokemon: Pokemon): unknown {
    if(!pokemon)return
    return pokemon.sprites.other?.['official-artwork'].front_default
  }

}

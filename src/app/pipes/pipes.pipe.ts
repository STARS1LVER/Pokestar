import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ImagePoke',
  standalone: true
})
export class ImagePokePipe implements PipeTransform {

  transform(id: string): unknown {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  }

}

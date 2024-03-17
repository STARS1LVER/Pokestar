import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon-interface';

@Pipe({
  name: 'WeightPipe',
  standalone: true
})
export class WeightPipe implements PipeTransform {

  transform( weight: number ): unknown {
    return ( weight / 10).toFixed(1) + 'Kg'
  }

}

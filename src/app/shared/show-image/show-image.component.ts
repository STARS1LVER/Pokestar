import { Component, Input } from '@angular/core';
import { Pokemon, Sprites } from '../../interfaces/pokemon-interface';

@Component({
  selector: 'app-show-image',
  standalone: true,
  imports: [],
  templateUrl: './show-image.component.html',
  styleUrl: './show-image.component.css'
})
export class ShowImageComponent {

  @Input() public image!: string

}

import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, inject, output, EventEmitter } from '@angular/core';
import { Result } from '../../interfaces/poke-list';
import { ImagePokePipe } from '../../pipes/imageCard.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon-interface';
import { RouterModule } from '@angular/router';
import { ImageNullPipe } from '../../pipes/imagenNull.pipe';
import { ShowImageComponent } from '../show-image/show-image.component';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [
    ImagePokePipe,
    TitleCasePipe,
    UpperCasePipe,
    RouterModule,
    ImageNullPipe,
    ShowImageComponent  ],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.css'
})
export class CardPokemonComponent implements OnInit {



  @Input({
    required: true
  }) public pokemon!: Pokemon

  @Output() public showImage = new EventEmitter<string>




  ngOnInit(): void {
    // console.log(this.pokemonData)
    // if( !this.pokemon ) throw new Error('Property is required');
  }


  public changePage( photo: string ) {

    this.showImage.emit(photo)


  }


}




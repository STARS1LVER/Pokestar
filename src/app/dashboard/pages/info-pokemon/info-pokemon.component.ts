import { Component, OnInit, inject } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon-interface';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../../service/pokemon.service';
import { switchMap } from 'rxjs';
import { ImageInfoPipe } from '../../../pipes/imageInfo.pipe';
import { FlavorTextEntry, PokeDetails } from '../../../interfaces/pokemonMoreinfo';
import { WeightPipe } from '../../../pipes/weight.pipe';

@Component({
  selector: 'app-info-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageInfoPipe,
    WeightPipe,
    TitleCasePipe ],
  templateUrl: './info-pokemon.component.html',
  styleUrl: './info-pokemon.component.css',
})
export default class InfoPokemonComponent implements OnInit {
  // * Properties
  public pokemon!: Pokemon;
  public pokemonDescription!:FlavorTextEntry | undefined;

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.pokemonService.getPokemonById(id).pipe(
            switchMap((data) => {
              this.pokemon = data;
              return this.pokemonService.getMoreDetailsToPokemon(id);
            })
          )
        )
      )
      .subscribe({
        next: (data) => {

          if (!data) return this.router.navigate(['dashboard/home']);
           this.pokemonDescription =  data.flavor_text_entries.find((  texto: any ) => texto.language.name === "es")


          return;
        },
        error: (error) => {
          console.log('Error en la solicitud', error);
        },
      });
  }
}

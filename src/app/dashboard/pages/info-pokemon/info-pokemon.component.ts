import { Component, OnInit, inject } from '@angular/core';
import { Pokemon } from '../../../interfaces/pokemon-interface';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../../service/pokemon.service';
import { EMPTY, catchError, delay, switchMap, tap } from 'rxjs';
import { ImageInfoPipe } from '../../../pipes/imageInfo.pipe';
import { FlavorTextEntry, PokeDetails } from '../../../interfaces/pokemonMoreinfo';
import { WeightPipe } from '../../../pipes/weight.pipe';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-info-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageInfoPipe,
    WeightPipe,
    TitleCasePipe,
    SpinnerComponent
   ],
  templateUrl: './info-pokemon.component.html',
  styleUrl: './info-pokemon.component.css',
})
export default class InfoPokemonComponent implements OnInit {
  // * Properties
  public pokemon!: Pokemon;
  public pokemonDescription!:FlavorTextEntry | undefined;
  public isLoading: boolean = false

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.getIdByActivatedRoute()

  }

  public getIdByActivatedRoute(){
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.pokemonService.getPokemonById(id)),
      tap(data => this.pokemon = data),
      switchMap(({ id }) => this.pokemonService.getMoreDetailsToPokemon(id.toString())),
      tap(data => {
        if (!data) {
          this.router.navigate(['dashboard/home']);
          return;
        }
        this.pokemonDescription = data.flavor_text_entries.find((texto: any) => texto.language.name === "es");
        this.isLoading = false;
      }),
      catchError(error => {
        console.log('Error en la solicitud', error);
        return EMPTY;
      }),
    ).subscribe(  );
  }



}

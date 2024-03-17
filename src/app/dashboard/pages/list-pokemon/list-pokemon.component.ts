import { Component, OnInit, inject } from '@angular/core';
import { Result, Tag } from '../../../interfaces/poke-list';
import { PokemonService } from '../../../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from '../../../shared/card-pokemon/card-pokemon.component';
import { PaginationPokemonComponent } from '../../../shared/pagination-pokemon/pagination-pokemon.component';
import { FilterOptionsComponent } from '../../../shared/filter-options/filter-options.component';
import { Pokemon } from '../../../interfaces/pokemon-interface';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    CardPokemonComponent,
    PaginationPokemonComponent,
    FilterOptionsComponent,
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css',
})
export default class ListPokemonComponent implements OnInit {
  // * Properties:
  public listPokemon!: Result[];
  public filteredTypePokemon!: Pokemon[];
  public currentPage: number = 1;
  public idsPokemon: string[] = [];
  public pokemonCompletedInfolist: Pokemon[] = [];
  public listprueba: any [] = []

  // Inyectamos dependencias!
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.getPokemonList(this.currentPage);

  }

  public getPokemonList(currentPage: number) {
    this.pokemonService.getListPokemon(currentPage).subscribe({
      next: (data) => {
        this.listPokemon = data;
        const numbers: string[] | undefined = this.getNumberPokemonId( this.listPokemon )
        if(!numbers) return
        this.pokemonCompletedInfolist =  this.getPokemonsById(numbers)
        // this.filteredTypePokemon = [...this.pokemonCompletedInfolist];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public onPageChange(page: number) {
    this.currentPage = page;
    if (this.currentPage <= 0) return;
    this.getPokemonList(page);
  }

  public extraerId(url: string): string {
    let splitUrl = url.split('/');
    let numero = splitUrl[splitUrl.length - 2];
    return numero;
  }

  public getNumberPokemonId(listPokemon: Result[]): string[] | undefined {
    if (!listPokemon) return;

    listPokemon.forEach((pokemonid, index) => {
      const id = this.extraerId(pokemonid.url);
      this.idsPokemon.push(id);
    });

    console.log(this.idsPokemon )
    return this.idsPokemon;
  }

  public getPokemonsById( numbers: string[] ){

    numbers.forEach(( number ) => {
      this.pokemonService.getPokemonById(number)
      .subscribe({
        next: ( pokemon ) => {
          this.pokemonCompletedInfolist.push(pokemon)
        },
        error: ( error ) => {
          console.log(error)
        }
      })
    })

    return this.pokemonCompletedInfolist

  }

  public filterType( tag: string ){
    this.filteredTypePokemon = this.pokemonCompletedInfolist.filter((pokemon) =>  this.listprueba.push( pokemon.types )   )
    console.log( this.listprueba[0].type.name )

  }




}

import { Component, OnInit, inject } from '@angular/core';
import { Result, Tag } from '../../../interfaces/poke-list';
import { PokemonService } from '../../../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { CardPokemonComponent } from '../../../shared/card-pokemon/card-pokemon.component';
import { PaginationPokemonComponent } from '../../../shared/pagination-pokemon/pagination-pokemon.component';
import { FilterOptionsComponent } from '../../../shared/filter-options/filter-options.component';
import { Pokemon } from '../../../interfaces/pokemon-interface';
import { HttpClient } from '@angular/common/http';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { ShowImageComponent } from '../../../shared/show-image/show-image.component';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    CardPokemonComponent,
    PaginationPokemonComponent,
    FilterOptionsComponent,
    SpinnerComponent,
    ShowImageComponent
  ],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css',
})
export default class ListPokemonComponent implements OnInit {
  // * Properties:
  public listPokemon: Pokemon[] = [];
  public currentPage: number = 1;
  public filterByType: string | undefined
  public totalPage!: number
  public image!: string




  // Inyectamos dependencias!
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.getPokemonList(this.currentPage, this.filterByType);


  }

  public getPokemonList(currentPage: number, type: string | undefined) {
    this.pokemonService.getListPokemon(currentPage, type).subscribe( data => {
       this.listPokemon = data.pokemon
       this.totalPage = data.total
    } )




  }

  public onPageChange(page: number) {
    this.currentPage = page;
    const totalPage = Math.ceil( 1302/15 )
    if (this.currentPage <= 0 || this.currentPage > totalPage) return;
    this.getPokemonList(this.currentPage,this.filterByType);

  }

  // private getListFilterPokemon(type: string){
  //   this.pokemonService.getListFilterByPokemon(type).subscribe( ( data )c => {
  //     console.log( data )
  //   })
  // }

  public filterType(type: string | undefined){
    this.currentPage = 1
    this.filterByType = type
    this.getPokemonList(this.currentPage,this.filterByType);
  }


  public getshowImage( img: string ){
    this.image = img
  }




}

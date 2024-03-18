import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable, flatMap, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { PokeList, Result } from '../interfaces/poke-list';
import { Pokemon } from '../interfaces/pokemon-interface';
import { PokeDetails } from '../interfaces/pokemonMoreinfo';
import { PokeType, PokemonSummary } from '../interfaces/poke-type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // * Properties:
  private httpClient = inject(HttpClient)

  constructor() { }

  /**
   * Usamos el operador rxjs map para filtrar directamente el resulstado
   * @returns un Observable<Result[]>
   */
  public getListPokemon(currentPage: number, type: string| undefined ): Observable<{ total: number; pokemon: Pokemon[]; }>    {

    if(!type){
      const params = new HttpParams().set('limit', 15).set('offset', currentPage); // parámetros
      return this.httpClient.get<PokeList>(`${environments.baseUrl}pokemon`, { params }).pipe(

        switchMap((respuesta) => {

          const pokemonObservables = respuesta.results.map((data) => this.httpClient.get<Pokemon>(data.url));
          return forkJoin(pokemonObservables).pipe(
            map((pokemon) => ({ total: respuesta.count, pokemon }))
          );
        })
      )
    }

   return this.getListFilterByPokemon(type,currentPage)
  }







  public getPokemonById( id: string ): Observable<Pokemon>{
    return this.httpClient.get<Pokemon>(`${environments.baseUrl}pokemon/${id}`)
  }

  public getMoreDetailsToPokemon( id: string ) :Observable<PokeDetails> {
    return this.httpClient.get<PokeDetails>(`${environments.baseUrl}pokemon-species/${id}`)
  }

  private getListFilterByPokemon(type: string, currentPage: number): Observable<{ total: number; pokemon: Pokemon[]; }>  {
    return this.httpClient.get<PokeType>(`${environments.baseUrl}type/${type}`).pipe(
      switchMap((respuesta) => {
        const pokemonObservables = respuesta.pokemon.map((data) => this.httpClient.get<Pokemon>(data.pokemon.url));
        return forkJoin(pokemonObservables);
      }),
      switchMap((pokemons) => {
        const pageSize = 15; // Tamaño de la página
        const pages = Math.ceil(pokemons.length / pageSize); // Número total de páginas
        const matrizPokemon = Array.from({ length: pages }, (_, i) => pokemons.slice(i * pageSize, i * pageSize + pageSize))
        return of({ total: pokemons.length  ,  pokemon: matrizPokemon[currentPage] });
      })
    );
  }


}

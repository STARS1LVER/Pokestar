import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable, map } from 'rxjs';
import { PokeList, Result } from '../interfaces/poke-list';
import { Pokemon } from '../interfaces/pokemon-interface';
import { PokeDetails } from '../interfaces/pokemonMoreinfo';

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
  public getListPokemon(currentPage: number): Observable<Result[]>  {
    return this.httpClient.get<PokeList>(`${environments.baseUrl}pokemon?limit=15&offset=${currentPage}`)
    .pipe(
      map( ( respuesta )  => respuesta.results )
    )
  }


  public getPokemonById( id: string ): Observable<Pokemon>{
    return this.httpClient.get<Pokemon>(`${environments.baseUrl}pokemon/${id}`)
  }

  public getMoreDetailsToPokemon( id: string ) :Observable<PokeDetails> {
    return this.httpClient.get<PokeDetails>(`${environments.baseUrl}pokemon-species/${id}`)
  }
}

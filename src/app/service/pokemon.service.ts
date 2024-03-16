import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from '../../environments/environments';
import { Observable, map } from 'rxjs';
import { PokeList, Result } from '../interfaces/poke-list';
import { Pokemon } from '../interfaces/pokemon-interface';

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
  public getListPokemon(): Observable<Result[]>  {
    return this.httpClient.get<PokeList>(`${environments.baseUrl}pokemon?limit=15&offset=1`)
    .pipe(
      map( ( respuesta )  => respuesta.results )
    )
  }


  public getPokemonById( id: string ): Observable<Pokemon>{
    return this.httpClient.get<Pokemon>(`${environments.baseUrl}pokemon/${id}`)
  }
}

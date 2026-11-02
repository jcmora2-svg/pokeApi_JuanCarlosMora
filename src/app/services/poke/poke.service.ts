import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonDetail } from '../../models/pokemon';
import { PokeApiResponse } from '../../models/poke-api-response';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=25';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<PokeApiResponse>(this.apiUrl).pipe(
      map(response => {
        return response.results.map((item, index) => {
          const id = index + 1;
          return {
            id: id,
            name: item.name,
            url: item.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });
      })
    );
  }

  getPokemonDetail(id: number | string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
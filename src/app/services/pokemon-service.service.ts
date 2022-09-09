import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonUrl} from '../models/pokemon-url';
import { PokemonDetails, PokemonDetailsInterface } from '../models/pokemon-details';
import { Trainer, TrainerInterface } from '../models/trainer';

@Injectable({
  providedIn: 'root'
})

export class PokemonServiceService {

  private readonly namesUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

  private readonly basePokemonUrl = 'http://localhost:8080';
  

  constructor(private http : HttpClient) { }

  getPokemon(url : string) : Observable<any> {
    return this.http.get<any>(url);
  }

  getListOfPokemonNames() : Observable<PokemonApiResult> {
    return this.http.get<PokemonApiResult>(this.namesUrl + '');
  }

  getListOfTrainers() : Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.basePokemonUrl + '/trainerApi/');
  }

  addPokemonToTeam(pokemon : PokemonDetailsInterface) : Observable<PokemonDetailsInterface> {    
    return this.http.post<PokemonDetailsInterface>(this.basePokemonUrl + '/addPokemon', pokemon);
  }

  addTrainer(trainer : TrainerInterface) : Observable<TrainerInterface> {
    return this.http.post<TrainerInterface>(this.basePokemonUrl + '/addTrainer', trainer);
  }

  getPokemonfromDB(id: number) : Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(this.basePokemonUrl + '/pokemonApi/' + id);
  }

  getTeamPokemonsfromDB(id: number) : Observable<PokemonDetails[]> {
    return this.http.get<PokemonDetails[]>(this.basePokemonUrl + '/teamApi/' + id);
  }

  getTrainerfromDB(id: number) : Observable<Trainer> {
    return this.http.get<Trainer>(this.basePokemonUrl + '/trainerApi/' + id);
  }

  deleteTrainerfromDB(id: number) : Observable<Trainer> {
    return this.http.delete<Trainer>(this.basePokemonUrl + '/deleteTrainer/' + id);
  }

  deletePokemonFromTeam(id: number) : Observable<PokemonDetails> {
    return this.http.delete<PokemonDetails>(this.basePokemonUrl + '/deletePokemon/' + id);
  }
  
}

export interface PokemonApiResult {
  results: PokemonUrl[];
}
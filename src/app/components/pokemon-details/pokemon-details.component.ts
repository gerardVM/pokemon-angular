import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { PokemonServiceService } from '../../services/pokemon-service.service';
import { PokemonDetails, PokemonDetailsInterface } from '../../models/pokemon-details';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  @Input()
  pokemonDetails : PokemonDetails = new PokemonDetails(0,"","",[],new Trainer(0,""));

  @Input()
  selectedTrainer : Trainer = new Trainer(0,"");

  newPokemonDetails : PokemonDetailsInterface = { id: 0, name: "", spriteUrl: "", abilities: [], trainer: new Trainer(0,"")};
  teamPokemons : Array<PokemonDetails> = [];
  successMessage : String = "";
  numberOfPokemonsInTeam : number = 0;

  constructor(private pokemonService: PokemonServiceService) { }

  ngOnInit(): void {
  }

  addPokemonToTeam(): void {
    this.pokemonService.getTeamPokemonsfromDB(this.selectedTrainer.id).subscribe((result) => {
      this.numberOfPokemonsInTeam = result.length;
    });
    if (this.selectedTrainer.id == 0) {
      alert("Please select a trainer first");
    } else if (this.numberOfPokemonsInTeam >= 7) {
      alert("You can't have more than 7 pokemons in your team");
    } else {
      this.pokemonDetails.trainer = this.selectedTrainer;
      this.newPokemonDetails.name = this.pokemonDetails.name;
      this.newPokemonDetails.spriteUrl = this.pokemonDetails.spriteUrl;
      this.newPokemonDetails.abilities = this.pokemonDetails.abilities;
      this.newPokemonDetails.trainer = this.pokemonDetails.trainer;
      this.pokemonService.addPokemonToTeam(this.newPokemonDetails).subscribe(
        (result) => {this.successMessage = "POKEMON ADDED TO TEAM!";},
        (error) => {this.successMessage = "THIS POKEMON IS ALREADY TAKEN!";}
      );    
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);      
      }
  }


}

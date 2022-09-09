import { Component, Input, OnInit } from '@angular/core';
import { PokemonServiceService } from '../../services/pokemon-service.service';
import { PokemonUrl } from '../../models/pokemon-url';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {


  pokemonNames : Array<PokemonUrl> = []
  pokemonDetails: PokemonDetails = new PokemonDetails(0,"","",[], new Trainer(0,""));

  pokemonForm: FormGroup;
  pokemonSelector: FormControl

  selectedTrainer : Trainer = new Trainer(0,"");


  constructor(private pokemonService: PokemonServiceService) {
    this.pokemonSelector = new FormControl('', Validators.required);
    this.pokemonForm = new FormGroup({
      pokemonSelector: this.pokemonSelector
    });
  
   }

  ngOnInit(): void {
    this.showFirstPokemon();    
  }

  showFirstPokemon() {
    this.pokemonService.getListOfPokemonNames().subscribe((result) => {
      this.pokemonNames = result.results
      this.pokemonService.getPokemon(this.pokemonNames[0].url).subscribe((result) => {
        this.pokemonDetails.name = result.name;
        this.pokemonDetails.spriteUrl = result.sprites.front_default;
        for (let ability of result.abilities) {
          this.pokemonDetails.abilities.push(ability.ability.name);
        }  });
    });

  }

  onChoose() {

    this.pokemonDetails.abilities = [];    
    for (let pokemon of this.pokemonNames) {
      if (pokemon.name == this.pokemonSelector.value) {
        this.pokemonService.getPokemon(pokemon.url).subscribe((result) => {
          this.pokemonDetails.name = result.name;
          this.pokemonDetails.spriteUrl = result.sprites.front_default;
          for (let ability of result.abilities) {
            this.pokemonDetails.abilities.push(ability.ability.name);
          }
          
        });
      }
    }
  }

  selectTrainer(trainerId: any): void {
    this.pokemonService.getTrainerfromDB(trainerId).subscribe((result) => {
      this.selectedTrainer = result;
    });    
  }

}

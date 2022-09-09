import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from 'src/app/models/pokemon-details';
import { Trainer } from 'src/app/models/trainer';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';


@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.css']
})
export class PokemonTeamComponent implements OnInit {

  team: Array<PokemonDetails> = [];

  @Input()
  selectedTrainer : Trainer = new Trainer(0,"");

  constructor(private pokemonService: PokemonServiceService) { }

  ngOnInit(): void {      
  }

  update() {
    this.pokemonService.getTeamPokemonsfromDB(this.selectedTrainer.id).subscribe((result) => {
      this.team = result;
    });
  }

  deletePokemonFromTeam(pokemon: PokemonDetails) {
    this.pokemonService.deletePokemonFromTeam(pokemon.id).subscribe();
    setTimeout(() => {
      this.update();
    }, 500);  
  }


}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonServiceService } from 'src/app/services/pokemon-service.service';
import { Trainer } from 'src/app/models/trainer';
import { TrainerInterface } from 'src/app/models/trainer';

@Component({
  selector: 'app-pokemon-trainer',
  templateUrl: './pokemon-trainer.component.html',
  styleUrls: ['./pokemon-trainer.component.css']
})
export class PokemonTrainerComponent implements OnInit {

  trainers: Array<Trainer> = [];
  newTrainer : TrainerInterface = { id: 0, name: "" };
  listOfNames: Array<string> = [];

  @Output() 
  trainerEvent:EventEmitter<number> = new EventEmitter();

  trainerForm: FormGroup;
  trainerNameInput: FormControl;


  constructor(private pokemonService: PokemonServiceService) {
    this.trainerNameInput = new FormControl('', [Validators.required]);
    this.trainerForm = new FormGroup({
      trainerNameInput: this.trainerNameInput
    });
  
   }

  ngOnInit(): void {
    this.pokemonService.getListOfTrainers().subscribe((result) => {
      this.trainers = result;
    });
  }

  onSubmit() {    
    this.newTrainer.name = this.trainerNameInput.value;
    console.log(this.newTrainer)
    this.pokemonService.addTrainer(this.newTrainer).subscribe();    
    this.trainerNameInput.reset();        
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);   
    
  }

  deleteTrainer(trainerid: number) {
    this.pokemonService.deleteTrainerfromDB(trainerid).subscribe(
      () => {},
      (error) => {alert("Trainer has a team, delete team first")},
    );
    setTimeout(() => {
      this.ngOnInit();
    }, 500);   
  }

  selectTrainer(trainerid: number){
    this.trainerEvent.emit(trainerid);
    }

}

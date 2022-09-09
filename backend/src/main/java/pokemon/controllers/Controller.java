package pokemon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pokemon.models.Pokemon;
import pokemon.models.Trainer;
import pokemon.repositories.PokemonRepository;
import pokemon.repositories.TrainerRepository;
import pokemon.services.PokemonService;

import java.util.List;

@RestController
public class Controller {

    @Autowired
    PokemonRepository pokemonRepository;

    @Autowired
    TrainerRepository trainerRepository;

    @Autowired
    PokemonService pokemonService;

    @GetMapping("/pokemonApi/{id}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public String getPokemon(@PathVariable Long id) {
        return pokemonRepository.findById(id).get().getName();
    }

    @GetMapping("/trainerApi")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public List<Trainer> getTrainer() {
        return trainerRepository.findAll();
    }

    @GetMapping("/trainerApi/{id}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public Trainer getTrainer(@PathVariable Long id) {
        return trainerRepository.findById(id).get();
    }

    @GetMapping("/teamApi/{trainerId}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public List<Pokemon> getTeam(@PathVariable Long trainerId) {
        return pokemonService.findByTrainerId(trainerId);
    }


    @PostMapping("/addPokemon")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void addPokemon(@RequestBody Pokemon pokemon) {
        pokemonRepository.save(pokemon);
    }

    @PostMapping("/addTrainer")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void addTrainer(@RequestBody Trainer trainer) {
        trainerRepository.save(trainer);
    }

    @DeleteMapping("/deletePokemon/{id}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deletePokemon(@PathVariable Long id) {
        pokemonRepository.deleteById(id);
    }

    @DeleteMapping("/deleteTrainer/{id}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deleteTrainer(@PathVariable Long id) {
        trainerRepository.deleteById(id);
    }


}
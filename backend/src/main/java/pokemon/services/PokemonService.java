package pokemon.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pokemon.models.Pokemon;
import pokemon.models.Trainer;
import pokemon.repositories.PokemonRepository;
import pokemon.repositories.TrainerRepository;

import java.util.List;

@Service
public class PokemonService {
    @Autowired
    PokemonRepository pokemonRepository;

    @Autowired
    TrainerRepository trainerRepository;

    public List<Pokemon> findByTrainerId(Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId).get();
        return pokemonRepository.findByTrainer(trainer);
    }
}

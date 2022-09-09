package pokemon.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pokemon.models.Pokemon;
import pokemon.models.Trainer;

import java.util.List;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon,Long> {

    List<Pokemon> findByTrainer(Trainer trainer);
}


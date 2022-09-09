package pokemon.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.servlet.annotation.HttpConstraint;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String name;
    private String spriteUrl;
    @Embedded
    private List<String> abilities;
    @ManyToOne
    @JoinColumn(name = "trainer")
    private Trainer trainer;
}

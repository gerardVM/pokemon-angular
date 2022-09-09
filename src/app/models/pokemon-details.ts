import { TargetBinder } from "@angular/compiler";
import { Trainer, TrainerInterface } from "./trainer";

export class PokemonDetails {

    constructor(
        private _id: number,
        private _name: string,
        private _spriteUrl: string,
        private _abilities: string[],
        private _trainer: Trainer,
    ) {}

    get id() { return this._id; }
    get name() { return this._name; }
    get spriteUrl() { return this._spriteUrl; }
    get abilities() { return this._abilities; }
    get trainer() { return this._trainer; }    

    set id(id: number) { this._id = id; }
    set name(name: string) { this._name = name; }
    set spriteUrl(spriteUrl: string) { this._spriteUrl = spriteUrl; }
    set abilities(abilities: string[]) { this._abilities = abilities; }
    set trainer(trainer: Trainer) { this._trainer = trainer; }    
}

export interface PokemonDetailsInterface {
    id: number;
    name: string;
    spriteUrl: string;
    abilities: string[];
    trainer: TrainerInterface;
}

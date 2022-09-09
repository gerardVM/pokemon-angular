export class Trainer {

    constructor(    
        private _id: number,
        private _name: string,
    ) {}

    get name() { return this._name; }
    get id() { return this._id; }
    
    set name(name: string) { this._name = name; }
    set id(id: number) { this._id = id; }


    }

    export interface TrainerInterface {
        id: number;
        name: string;
    }

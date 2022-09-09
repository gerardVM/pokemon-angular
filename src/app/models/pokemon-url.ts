export class PokemonUrl {
    constructor(
        private _name: string,
        private _url: string,
    ) {}

    get name() { return this._name; }
    get url() { return this._url; }

    set name(name: string) { this._name = name; }
    set url(url: string) { this._url = url; }         
}

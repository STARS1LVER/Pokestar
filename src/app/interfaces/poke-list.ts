export interface PokeList {
  count:    number;
  next:     string;
  previous: string;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}


export enum Tag {
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Ice = "ice",
  Figthing = "figthing",
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Steel = 'steel',
  Fairy = 'fairy'
}

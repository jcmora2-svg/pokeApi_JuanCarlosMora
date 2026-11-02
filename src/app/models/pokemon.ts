export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats?: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}
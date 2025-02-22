import {PokedexMap, PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonExpValueMap, PokemonShardConsumptionData} from '@/types/game/pokemon/xp';


export type PokemonExpCalculatorDataProps = {
  pokedexMap: PokedexMap,
  xpValueData: PokemonExpValueMap,
  xpShardConsumption: PokemonShardConsumptionData,
  maxLevel: number,
};

export type PokemonExpCalculatorParams = {
  xpToNext: number,
  currentLv: number,
  ownedCandies: number,
  rate: {
    dreamShardDepletion: number,
    candyExpBoost: number,
  },
};

export type PokemonExpCalculatorInput = PokemonExpCalculatorParams & {
  pokemon: PokemonId | null,
  nature: NatureId | null,
  showNonBreakthroughLevel: boolean,
};

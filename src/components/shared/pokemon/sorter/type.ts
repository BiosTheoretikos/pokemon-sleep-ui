import {PokemonIngredientPick} from '@/types/game/producing/ingredient';
import {ProducingRateSingleParams} from '@/types/game/producing/rate';
import {BerryData} from '@/types/mongo/berry';
import {IngredientMap} from '@/types/mongo/ingredient';
import {PokemonInfo} from '@/types/mongo/pokemon';


export const pokemonSortType = [
  'id',
  'berryEnergy',
  'berryCount',
  'ingredientEnergy',
  'ingredientCount',
  'totalEnergy',
  'friendshipPoint',
  'frequency',
] as const;

export type PokemonSortType = typeof pokemonSortType[number];

export type PokemonInfoWithSortingPayload<TExtra> = ProducingRateSingleParams & {
  pokemon: PokemonInfo,
  level: number,
  ingredients: PokemonIngredientPick[],
  extra: TExtra,
};

export type SortedPokemonInfo<TExtra, TSource extends PokemonInfoWithSortingPayload<TExtra>> = {
  sorter: ReturnType<PokemonSorterGetter>,
  source: TSource,
};

export type PokemonSorterGetterOpts = ProducingRateSingleParams & {
  pokemon: PokemonInfo,
  level: number,
  ingredients: PokemonIngredientPick[],
  ingredientMap: IngredientMap,
  berryData: BerryData | null,
};

export type PokemonSorterGetter = (opts: PokemonSorterGetterOpts) => number;

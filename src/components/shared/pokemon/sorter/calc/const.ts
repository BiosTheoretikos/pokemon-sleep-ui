import {
  getBerryRateSorter,
  getIngredientFirstRateSorter,
  getIngredientTotalRateSorter,
} from '@/components/shared/pokemon/sorter/calc/sorter';
import {PokemonSorterGetter, PokemonSortType} from '@/components/shared/pokemon/sorter/type';


export const sortInAsc: PokemonSortType[] = [
  'id',
  'frequency',
  'frequencyOfBerry',
  'frequencyOfIngredient',
  'friendshipPoint',
];

export const pokemonSorterGetterBySortType: {[type in PokemonSortType]: PokemonSorterGetter} = {
  id: ({pokemon}) => pokemon.id,
  dateAdded: ({dateAdded}) => dateAdded ?? 0,
  ingredientEnergy: (opts) => getIngredientTotalRateSorter({key: 'dailyEnergy', opts}),
  ingredientCount: (opts) => getIngredientTotalRateSorter({key: 'quantity', opts}),
  berryEnergy: (opts) => getBerryRateSorter({key: 'dailyEnergy', opts}),
  berryCount: (opts) => getBerryRateSorter({key: 'quantity', opts}),
  friendshipPoint: ({pokemon}) => pokemon.stats.friendshipPoints,
  frequency: ({pokemon}) => pokemon.stats.frequency,
  frequencyOfBerry: (opts) => getBerryRateSorter({key: 'frequency', opts}),
  frequencyOfIngredient: (opts) => getIngredientFirstRateSorter({key: 'frequency', opts}),
  totalEnergy: (opts) => {
    const berry = getBerryRateSorter({key: 'dailyEnergy', opts});
    const ingredient = getIngredientTotalRateSorter({key: 'dailyEnergy', opts});

    return berry + ingredient;
  },
};

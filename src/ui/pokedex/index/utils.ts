import merge from 'lodash/merge';

import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/input/utils';
import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {PokedexDisplayType} from '@/ui/pokedex/index/input/type';
import {PokedexDisplay, PokedexFilter} from '@/ui/pokedex/index/type';


const exhaustIngredientCombinationsIfDisplay: PokedexDisplayType[] = [
  'ingredient',
  'ingredientCount',
  'ingredientEnergy',
  'totalEnergy',
];

const exhaustIngredientCombinationsIfSort: PokemonSortType[] = [
  'ingredientCount',
  'ingredientEnergy',
  'totalEnergy',
];

export const toCalculateAllIngredientPossibilities = ({display, sort}: PokedexFilter): boolean => {
  return (
    exhaustIngredientCombinationsIfDisplay.includes(display) ||
    exhaustIngredientCombinationsIfSort.includes(sort)
  );
};

export const generateInitialFilter = (preloadedDisplay: Partial<PokedexDisplay> | undefined): PokedexFilter => {
  return {
    name: '',
    ...generatePokemonInputFilterExtended(),
    ...merge({
      display: 'mainSkill',
      sort: 'id',
    }, preloadedDisplay),
  };
};

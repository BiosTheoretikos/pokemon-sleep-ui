import {useFilterInput} from '@/components/input/filter/hook';
import {isDataIncludingAllOfFilter} from '@/components/input/filter/utils/check';
import {UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {
  generatePokemonInputFilterExtended,
  isPokemonIncludedFromFilter,
} from '@/components/shared/pokemon/filter/utils';
import {PokemonId, PokemonInfo, PokemonInfoWithMap} from '@/types/game/pokemon';
import {AnalysisComparisonFilter} from '@/ui/analysis/page/type';
import {generateIngredientProductionAtLevels} from '@/utils/game/producing/ingredient/chain';


type UseAnalysisFilterOpts = UsePokemonFilterCommonData & {
  data: PokemonInfoWithMap[],
  currentPokemon: PokemonInfo,
};

export const useAnalysisFilter = ({data, currentPokemon, ...filterData}: UseAnalysisFilterOpts) => {
  const {ingredientChainMap} = filterData;

  return useFilterInput<AnalysisComparisonFilter, PokemonInfoWithMap, PokemonId>({
    data,
    dataToId: ({info}) => info.id,
    initialFilter: {
      ...generatePokemonInputFilterExtended(),
      ingredients: generateIngredientProductionAtLevels(ingredientChainMap[currentPokemon.ingredientChain]),
    },
    isDataIncluded: (filter, data) => {
      if (!isDataIncludingAllOfFilter({
        filter,
        filterKey: 'mapId',
        ids: data.mapsAvailable,
        idInFilterToIdForCheck: Number,
        onIdsEmpty: false,
      })) {
        return false;
      }

      // `filterData` has name conflict of `pokemon`, so it has to be the first in the spread
      return isPokemonIncludedFromFilter({...filterData, filter, pokemon: data.info});
    },
  });
};

import {defaultSeedUsage} from '@/const/game/seed';
import {PokemonFinalEvolutionInfo} from '@/types/game/pokemon';
import {teamMakerMaxMemberCount, teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {TeamMakerInputCalculated, TeamMakerRateAtMaxPotentialData} from '@/ui/team/maker/calc/type';
import {GetTeamMakerCalcPrepOpts} from '@/ui/team/maker/hook/type';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {getPokemonProducingParams, getProducingRateSingleParams} from '@/utils/game/producing/params';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';
import {toCalculatedUserSettings} from '@/utils/user/settings/calculated';


type GetTeamMakerRateAtMaxPotentialOpts = GetTeamMakerCalcPrepOpts & {
  calculatedInput: TeamMakerInputCalculated,
};

export const getTeamMakerRateAtMaxPotential = ({
  pokeboxList,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  mainSkillMap,
  subSkillMap,
  input,
  settings,
  calculatedInput,
}: GetTeamMakerRateAtMaxPotentialOpts): TeamMakerRateAtMaxPotentialData[] => {
  return pokeboxList
    .flatMap((pokeInBox) => {
      if (!input.previewFinalEvolution) {
        return [{
          evolutionInfo: {
            id: pokeInBox.pokemon,
            evolutionCount: pokeInBox.evolutionCount,
          } satisfies PokemonFinalEvolutionInfo,
          pokeInBox,
        }];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map((evolutionInfo) => ({
        evolutionInfo,
        pokeInBox,
      }));
    })
    .map(({evolutionInfo, pokeInBox}) => {
      const {id, evolutionCount} = evolutionInfo;
      const pokemon = pokedexMap[id];

      if (!pokemon) {
        return null;
      }

      const level = input.previewLevel ?? pokeInBox.level;
      const calcOpts: GetPokemonProducingRateOpts = {
        berryData: berryDataMap[pokemon.berry.id],
        skillData: mainSkillMap[pokemon.skill],
        seeds: pokeInBox.seeds ?? defaultSeedUsage,
        pokemonProducingParams: getPokemonProducingParams({
          pokemonId: id,
          pokemonProducingParamsMap,
        }),
        ingredientMap,
        ...pokeInBox,
        ...toCalculatedUserSettings({settings}),
        ...getProducingRateSingleParams({
          ...pokeInBox,
          level,
          subSkillMap,
          helpingBonusSimulateOnSelf: true,
        }),
        // Override `level` because preview level might be active
        level,
        // Override `pokemon` in `pokeInBox`
        pokemon,
        // Override `ingredients` in `pokeInBox`
        ingredients: getEffectiveIngredientProductions(pokeInBox),
        // Override helper count to maximum possible value to calculate max potential
        helperCount: teamMakerMaxMemberCount,
        evolutionCount,
      };
      const rate = getPokemonProducingRateSingle({
        snorlaxFavorite: input.snorlaxFavorite,
        useMaxIngredientMultiplier: true,
        period: teamMakerProductionPeriod,
        ...calculatedInput,
        ...calcOpts,
      });

      return {
        rate,
        pokeInBox,
        calcOpts,
        totalStrength: getTotalOfPokemonProducingRate({rate: rate.rate.final, state: 'equivalent'}).energy,
      };
    })
    .filter(isNotNullish)
    .sort((a, b) => (
      b.totalStrength - a.totalStrength
    ));
};

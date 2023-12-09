import {PokeboxPreviewLevel} from '@/components/shared/pokebox/preview/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {MealMap} from '@/types/game/meal/main';
import {PokeInBox} from '@/types/game/pokebox';
import {PokedexMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProduceType} from '@/types/game/producing/common';
import {PokemonProducingRateFinal} from '@/types/game/producing/rate';
import {SnorlaxRankFinalEstimate} from '@/types/game/rank';
import {SnorlaxDataOfMap, SnorlaxFavorite} from '@/types/game/snorlax';
import {UserCookingPreset} from '@/types/userData/cooking';
import {UserSettingsBundle} from '@/types/userData/settings';
import {TeamMakerIngredientStats, TeamMakerMemberCount} from '@/ui/team/maker/calc/type';
import {GetTeamMakerResultsOpts} from '@/ui/team/maker/hook/type';


export type TeamMakerDataProps = {
  pokeboxList: PokeInBox[],
  pokedexMap: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  berryDataMap: BerryDataMap,
  ingredientChainMap: IngredientChainMap,
  ingredientMap: IngredientMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  mealMap: MealMap,
  mapMeta: FieldMetaMap,
  snorlaxData: SnorlaxDataOfMap[],
  preloaded: UserSettingsBundle,
};

export type TeamMakerInput = Pick<UserCookingPreset, 'mealType' | 'target' | 'recipeLevel' | 'ingredientCount'> & {
  snorlaxFavorite: SnorlaxFavorite,
  memberCount: TeamMakerMemberCount,
  previewLevel: PokeboxPreviewLevel,
  previewFinalEvolution: boolean,
  showInsufficientIngredients: boolean,
};

export type TeamMakerResult = {
  rates: PokemonProducingRateFinal<PokeInBox>,
  strength: {
    byType: {[type in ProduceType]: number},
    total: number,
  },
  ingredientStats: TeamMakerIngredientStats,
  finalEstimates: SnorlaxRankFinalEstimate[],
};

export type TeamMakerState = {
  loading: boolean,
  results: TeamMakerResult[],
  combinations: number | null,
  calcFinalOpts: GetTeamMakerResultsOpts | null,
};

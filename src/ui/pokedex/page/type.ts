import {BerryData} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SleepStyleNormal, SleepStyleSpecial} from '@/types/game/sleepStyle';
import {SynergizedSettingsRequiredData, UserSettingsBundle} from '@/types/userData/settings';


export type PokemonDataProps = SynergizedSettingsRequiredData & {
  pokedex: PokedexMap,
  pokemon: PokemonInfo,
  pokemonBranches: PokemonBranchData | null,
  pokemonProducingParams: PokemonProducingParams,
  sleepStyles: SleepStyleNormal[],
  sleepStylesSpecial: SleepStyleSpecial[],
  berryData: BerryData,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  preloaded: UserSettingsBundle,
};

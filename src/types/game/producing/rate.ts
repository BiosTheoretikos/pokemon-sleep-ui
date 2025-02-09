import {BerryId} from '@/types/game/berry';
import {EffectiveBonus} from '@/types/game/bonus';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo} from '@/types/game/pokemon';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {NatureId} from '@/types/game/pokemon/nature';
import {SeedUsage} from '@/types/game/pokemon/seed';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/carryLimit';
import {ProductionPeriod} from '@/types/game/producing/display';
import {ProducingSleepStateSplit} from '@/types/game/producing/split';
import {ProducingState, ProducingStateOfRate} from '@/types/game/producing/state';
import {Indexable} from '@/utils/type';


export type ProducingRate<T = number> = {
  period: ProductionPeriod,
  quantity: T,
  energy: T,
};

export type ProducingRateProportion = {
  count: number,
  picks: number,
};

export type ProducingRateOfItem = ProducingRate & {
  id: number,
  frequency: number,
};

export type ProducingRateOfItemOfSessions = {[state in ProducingState]: ProducingRateOfItem} & {
  id: number,
};

export type ProducingValueOfStates = {[state in ProducingStateOfRate]: number};

export type ProducingRateOfStates = ProducingRate<ProducingValueOfStates> & {
  id: number,
  frequency: ProducingValueOfStates,
};

export type ProducingRateSingleParams = {
  helperCount: number | null,
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateImplicitParams = {
  evolutionCount: number,
  seeds: SeedUsage,
};

export type ProducingRateCommonParams = {
  level: number,
  pokemon: PokemonInfo,
  frequency: number,
  bonus: EffectiveBonus,
  energyMultiplier: number,
};

export type PokemonProducingRate = {
  period: ProductionPeriod,
  fullPackStats: FullPackStats,
  sleepStateSplit: ProducingSleepStateSplit,
  carryLimitInfo: CarryLimitInfo,
  berry: ProducingRateOfStates,
  ingredient: {[ingredientId in IngredientId]: ProducingRateOfStates},
  skill: ProducingRateOfStates,
};

export type PokemonProducingRateWithPayload<TPayload> = {
  rate: {
    final: PokemonProducingRate,
    original: PokemonProducingRate,
  },
  payload: TPayload,
};
export type PokemonProducingRateByType = {
  berry: GroupedProducingRate<BerryId>,
  ingredient: GroupedProducingRate<IngredientId>,
  skill: GroupedProducingRate<MainSkillId>,
};

export type PokemonProducingRateFinal<TPayload> = {
  rates: PokemonProducingRateWithPayload<TPayload>[],
  grouped: PokemonProducingRateByType,
};

export type GroupedProducingRate<TId extends Indexable> = {[id in TId]?: ProducingRate};

import {natureEffectIdMap} from '@/const/game/nature';
import {natureDataMap} from '@/data/nature';
import {NatureEffectType, NatureId} from '@/types/game/pokemon/nature';


type GetNatureMultiplierOpts = {
  id: NatureId | null,
  effect: NatureEffectType,
};

const buffValueOfEffect: {[effect in NatureEffectType]: number} = {
  mainSkill: NaN,
  exp: 1.2,
  energy: 1.2,
  rateOfIngredient: 1.2,
  frequencyOfBase: 0.9,
};

const nerfValueOfEffect: {[effect in NatureEffectType]: number} = {
  mainSkill: NaN,
  exp: 0.8,
  energy: 0.8,
  rateOfIngredient: 0.8,
  frequencyOfBase: 1.1,
};

export const getNatureMultiplier = ({id, effect}: GetNatureMultiplierOpts): number => {
  if (!id) {
    return 1;
  }

  const natureDataToUse = natureDataMap[id];

  if (!natureDataToUse) {
    return 1;
  }

  if (natureDataToUse.buff === natureEffectIdMap[effect]) {
    return buffValueOfEffect[effect];
  }

  if (natureDataToUse.nerf === natureEffectIdMap[effect]) {
    return nerfValueOfEffect[effect];
  }

  return 1;
};

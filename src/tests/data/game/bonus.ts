import {EffectiveBonus} from '@/types/game/bonus';


export const testBonus: {[id in number]: EffectiveBonus} = {
  1: {
    map: 5,
    stamina: {
      logs: [], // ignore
      average: NaN, // ignore
      sleep: 2.2,
      awake: 1.6,
    },
    overall: 20,
  },
};

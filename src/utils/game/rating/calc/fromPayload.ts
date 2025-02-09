import {RatingCombination, RatingDataPoint} from '@/types/game/pokemon/rating';
import {CalculateRatingDataWorkerOpts} from '@/utils/game/rating/calc/type';
import {getRatingValueOfPossibility} from '@/utils/game/rating/possibility';
import {generatePossiblePokemonSubSkills} from '@/utils/game/subSkill/generate';


export const calculateRatingValueFromPayload = (opts: CalculateRatingDataWorkerOpts) => {
  const {
    level,
    friendshipLevel,
    ingredients,
    subSkillData,
    natureIds,
  } = opts;

  return [...generatePossiblePokemonSubSkills({
    level,
    subSkillData,
    friendshipLevel,
  })].flatMap((subSkill) => (
    natureIds.flatMap((nature): RatingDataPoint => {
      const combination: RatingCombination = {
        ingredients,
        subSkill,
        nature,
      };

      return {
        value: getRatingValueOfPossibility({...opts, combination}),
        combination,
      };
    })
  ));
};

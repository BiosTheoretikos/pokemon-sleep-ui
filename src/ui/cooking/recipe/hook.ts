import React from 'react';

import {IngredientId} from '@/types/game/ingredient';
import {Meal} from '@/types/game/meal/main';
import {PokemonProducingItem} from '@/types/game/pokemon/producing';
import {CookingRecipeInfo} from '@/ui/cooking/recipe/type';
import {CookingFilterIngredientCount} from '@/ui/cooking/type';


export type UseRecipeInfoOpts = {
  meal: Meal,
  ingredientCount: CookingFilterIngredientCount,
};

export const useRecipeInfo = ({meal, ingredientCount}: UseRecipeInfoOpts): CookingRecipeInfo => {
  return React.useMemo(() => {
    const ingredientSetReady = Object.fromEntries(meal.ingredients.map(({id, quantity}) => {
      const filterIngredientCount = ingredientCount[id];

      if (filterIngredientCount == null) {
        return [id, 0];
      }

      return [id, filterIngredientCount / quantity];
    }));
    const ingredientsMissing = meal.ingredients
      .map(({id, quantity}): PokemonProducingItem<IngredientId> => {
        const filterIngredientCount = ingredientCount[id];

        if (filterIngredientCount == null) {
          return {id, qty: 0};
        }

        return {id, qty: filterIngredientCount - quantity};
      })
      .filter(({qty}) => qty < 0);

    const isMealMakeable = Object.values(ingredientSetReady).every((set) => set >= 1);

    const mealsReady = Math.min(...(meal.ingredients.length ? Object.values(ingredientSetReady) : [0]));

    return {
      ingredientSetReady,
      ingredientsMissing,
      isMealMakeable,
      mealsReady,
    };
  }, [meal, ingredientCount]);
};

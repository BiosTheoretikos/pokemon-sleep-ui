import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {CookingExternalLink} from '@/ui/cooking/common/link';
import {MealMakerRecipePartsProps} from '@/ui/cooking/make/recipe/parts/type';


export const MealMakerRecipeTitle = ({
  filter,
  meal,
  mealName,
  mealsReady,
  isMealMakeable,
}: MealMakerRecipePartsProps) => {
  const isInventoryEnabled = Object.values(filter.inventory)
    .some((count) => count != null);

  return (
    <Flex direction="row" className="justify-between">
      <Flex direction="row" className="gap-1 truncate">
        {mealsReady >= 2 && <InfoIcon>{Math.floor(mealsReady)}</InfoIcon>}
        <div className={clsx(
          'truncate text-sm',
          isInventoryEnabled && !isMealMakeable && 'text-slate-400 dark:text-slate-600',
        )}>
          {mealName}
        </div>
      </Flex>
      <CookingExternalLink mealId={meal.id}/>
    </Flex>
  );
};

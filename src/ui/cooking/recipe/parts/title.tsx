import React from 'react';

import {clsx} from 'clsx';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {CookingRecipePartsProps} from '@/ui/cooking/recipe/parts/type';


export const CookingRecipeTitle = ({filter, mealName, mealsReady, isMealMakeable}: CookingRecipePartsProps) => {
  const isInventoryEnabled = Object.values(filter.ingredientCount)
    .some((count) => count != null);

  return (
    <Flex direction="row" className="gap-1">
      {mealsReady >= 2 && <InfoIcon>{Math.floor(mealsReady)}</InfoIcon>}
      <div className={clsx(
        'truncate text-left text-sm',
        isInventoryEnabled && !isMealMakeable && 'text-slate-400 dark:text-slate-600',
      )}>
        {mealName}
      </div>
    </Flex>
  );
};

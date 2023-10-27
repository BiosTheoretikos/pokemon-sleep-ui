'use client';
import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Grid} from '@/components/layout/grid';
import {MealLink} from '@/components/shared/meal/link';
import {useCalculatedUserSettings} from '@/hooks/userData/settings/calculated';
import {useMealFilter} from '@/ui/meal/index/hook';
import {MealInput} from '@/ui/meal/index/input/main';
import {MealDataProps} from '@/ui/meal/index/type';
import {getMealIngredientCount} from '@/utils/game/meal/count';


export const MealIndexClient = ({meals, ingredientMap, preloaded}: MealDataProps) => {
  const {settings, cooking} = preloaded;

  const {data: session} = useSession();
  const {calculatedSettings} = useCalculatedUserSettings({
    server: settings,
    client: session?.user.preloaded.settings,
  });
  const mealFilterProps = useMealFilter({
    data: meals,
    preloaded: cooking,
  });

  const {isIncluded, filter} = mealFilterProps;

  return (
    <>
      <MealInput data={meals} preloaded={cooking} {...mealFilterProps}/>
      <AdsUnit/>
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5',
      )}>
        {meals
          .map((meal) => ({
            meal,
            totalIngredientCount: getMealIngredientCount(meal),
          }))
          .sort((a, b) => {
            if (a.meal.type > b.meal.type) {
              return 1;
            }
            if (a.meal.type < b.meal.type) {
              return -1;
            }

            if (a.totalIngredientCount > b.totalIngredientCount) {
              return -1;
            }
            if (a.totalIngredientCount < b.totalIngredientCount) {
              return 1;
            }

            return 0;
          })
          .map(({meal}) => (
            <div key={meal.id} className={clsx(!isIncluded[meal.id] && 'hidden')}>
              <MealLink
                meal={meal}
                level={filter.mealLevel}
                showEnergy={filter.showEnergy}
                ingredientMap={ingredientMap}
                mapBonus={calculatedSettings.bonus.map}
              />
            </div>
          ))}
      </Grid>
      <AdsUnit/>
    </>
  );
};

import React from 'react';

import {getServerSession} from 'next-auth';

import {MealPageParams} from '@/app/[locale]/meal/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAllMealsAsMap} from '@/controller/meal';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByIngredientIds} from '@/controller/pokemon/ingredient';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MealClient} from '@/ui/meal/page/client';
import {MealServerDataProps} from '@/ui/meal/page/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type Props = {
  params: MealPageParams,
};

export const MealPage = async ({params}: Props) => {
  const {id, locale} = params;
  const mealMap = await getAllMealsAsMap();
  const meal = mealMap[parseInt(id)];

  if (!meal) {
    return <Failed text="Meal"/>;
  }

  const [
    session,
    pokedex,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonIngredientProductionMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getAllBerryData(),
    getAllIngredients(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonIngredientProductionByIngredientIds(meal.ingredients.map(({id}) => id)),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: MealServerDataProps = {
    meal,
    pokedex,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    pokemonIngredientProductionMap,
    pokemonMaxLevel,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.InPage.Cooking',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
      ]}>
        <MealClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};

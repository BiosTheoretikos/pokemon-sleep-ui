import React from 'react';

import {getServerSession} from 'next-auth';

import {IngredientPageParams} from '@/app/[locale]/ingredient/[id]/page';
import {AdsUnit} from '@/components/ads/main';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {authOptions} from '@/const/auth';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients, getIngredientData} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAllMealsAsMap} from '@/controller/meal';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getPokemonIngredientProductionByIngredient} from '@/controller/pokemon/ingredient';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSubSkillMap} from '@/controller/subSkill';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {IngredientMeta} from '@/ui/ingredient/page/meta';
import {IngredientPokemonProduction} from '@/ui/ingredient/page/pokemon';
import {IngredientCookableMeals} from '@/ui/ingredient/page/recipe';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type Props = {
  params: IngredientPageParams,
};

export const IngredientPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = Number(id);
  const ingredient = await getIngredientData(idNumber);

  if (!ingredient) {
    return <Failed text="Ingredient"/>;
  }

  const [
    session,
    pokemonIngredientProduction,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    pokedex,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonIngredientProductionByIngredient(ingredient.id),
    getAllPokemonProducingParams(),
    getAllBerryData(),
    getAllIngredients(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getAllMealsAsMap(),
    getPokemonAsMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: IngredientProductionDataProps = {
    pokedex,
    pokemonIngredientProduction,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <Flex className="gap-1.5 md:flex-row">
        <IngredientMeta {...ingredient}/>
        <IngredientCookableMeals mealMap={mealMap} ingredientMap={ingredientMap} ingredientId={ingredient.id}/>
      </Flex>
      <AdsUnit/>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.Metadata',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
      ]}>
        <IngredientPokemonProduction
          pokemonMaxLevel={pokemonMaxLevel}
          ingredient={ingredient}
          {...props}
        />
      </I18nProvider>
      <AdsUnit/>
    </PublicPageLayout>
  );
};

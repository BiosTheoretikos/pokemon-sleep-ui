import React from 'react';

import {getServerSession} from 'next-auth';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getAllMealsAsMap} from '@/controller/meal';
import {getAllPokemonAsArray} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSleepStyleNormalMap} from '@/controller/sleepStyle';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {createUserSettingsBundle} from '@/utils/user/settings/create';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = async ({params}: Props) => {
  const {id, locale} = params;
  const [
    session,
    pokemonList,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientChainMap,
    ingredientMap,
    mainSkillMap,
    sleepStyleMap,
    mealMap,
    mapMeta,
  ] = await Promise.all([
    getServerSession(authOptions),
    getAllPokemonAsArray(),
    getAllPokemonProducingParams(),
    getAllBerryData(),
    getIngredientChainMap(),
    getAllIngredients(),
    getMainSkillMap(),
    getSleepStyleNormalMap(),
    getAllMealsAsMap(),
    getAllMapMeta(),
  ]);

  const pokemon = pokemonList.find((pokemon) => pokemon.id === Number(id));

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  if (!berryDataMap) {
    return <Failed text="Berry"/>;
  }

  const props: AnalysisPageCommonProps = {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    mainSkillMap,
    ingredientMap,
    ingredientChainMap,
    berryDataMap,
    sleepStyleMap,
    mapMeta,
    mealMap,
    preloaded: createUserSettingsBundle(session),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Analysis',
        'UI.InPage.Pokedex',
        'UI.Metadata',
      ]}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};

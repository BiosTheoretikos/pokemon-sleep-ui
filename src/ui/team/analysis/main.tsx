import React from 'react';

import {getServerSession} from 'next-auth';

import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getAllBerryData, getPokemonMaxLevelByBerry} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getAllMapMeta} from '@/controller/mapMeta';
import {getPokemonAsMap} from '@/controller/pokemon/info';
import {getAllPokemonProducingParams} from '@/controller/pokemon/producing';
import {getSnorlaxRank} from '@/controller/snorlaxRank';
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {TeamAnalysisClient} from '@/ui/team/analysis/client/main';
import {TeamAnalysisServerDataProps} from '@/ui/team/analysis/type';
import {createUserSettings} from '@/utils/user/settings';


export const TeamAnalysis = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxRankData,
    mapMeta,
    mainSkillMap,
    subSkillMap,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getAllBerryData(),
    getAllIngredients(),
    getSnorlaxRank(),
    getAllMapMeta(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: TeamAnalysisServerDataProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    snorlaxRankData,
    mapMeta,
    mainSkillMap,
    subSkillMap,
    pokemonMaxLevel,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
        'UI.Producing',
        'UI.Stamina',
        'UI.UserSettings',
      ]}>
        <TeamAnalysisClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};

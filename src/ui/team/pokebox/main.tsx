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
import {getSubSkillMap} from '@/controller/subSkill';
import {DefaultPageProps} from '@/types/next/page/common';
import {LoginRequiredPageLayout} from '@/ui/base/layout/loginRequired';
import {PokeboxClient} from '@/ui/team/pokebox/client/main';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {createUserSettings} from '@/utils/user/settings';


const Pokebox = async () => {
  const [
    session,
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    pokemonMaxLevel,
  ] = await Promise.all([
    getServerSession(authOptions),
    getPokemonAsMap(),
    getAllPokemonProducingParams(),
    getIngredientChainMap(),
    getAllBerryData(),
    getAllIngredients(),
    getMainSkillMap(),
    getSubSkillMap(),
    getAllMapMeta(),
    getPokemonMaxLevelByBerry(),
  ]);

  const props: PokeboxCommonProps = {
    pokedexMap,
    pokemonProducingParamsMap,
    ingredientChainMap,
    berryDataMap,
    ingredientMap,
    mainSkillMap,
    subSkillMap,
    mapMeta,
    preloaded: {
      settings: createUserSettings(session?.user.preloaded.settings),
      display: session?.user.preloaded.pokeboxDisplay,
    },
    pokemonMaxLevel,
  };

  return <PokeboxClient {...props}/>;
};

export const PokeboxEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <LoginRequiredPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Team',
        'UI.Metadata',
      ]}>
        <Pokebox/>
      </I18nProvider>
    </LoginRequiredPageLayout>
  );
};

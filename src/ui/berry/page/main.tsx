import React from 'react';

import {getServerSession} from 'next-auth';

import {BerryPageParams} from '@/app/[locale]/berry/[id]/page';
import {Failed} from '@/components/icons/failed';
import {authOptions} from '@/const/auth';
import {I18nProvider} from '@/contexts/i18n';
import {getBerryData} from '@/controller/berry';
import {getFavoriteInfoOfBerry} from '@/controller/mapMeta';
import {getPokemonAsMap, getPokemonByBerry} from '@/controller/pokemon';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {BerryPageClient} from '@/ui/berry/page/client';
import {BerryPageCommonProps} from '@/ui/berry/page/type';
import {createUserSettings} from '@/utils/user/settings';


type Props = {
  params: BerryPageParams,
};

export const BerryPage = async ({params}: Props) => {
  const {id, locale} = params;
  const idNumber = parseInt(id);

  const [
    session,
    berryData,
    favoriteInfo,
    pokemonOfBerry,
    pokedex,
  ] = await Promise.all([
    getServerSession(authOptions),
    getBerryData(idNumber),
    getFavoriteInfoOfBerry(idNumber),
    getPokemonByBerry(idNumber),
    getPokemonAsMap(),
  ]);

  if (!berryData) {
    return <Failed text="Berry"/>;
  }

  const props: BerryPageCommonProps = {
    berryData,
    favoriteInfo,
    pokemonOfBerry,
    pokedex,
    preloadedSettings: createUserSettings(session?.user.preloaded.settings),
  };

  return (
    <PublicPageLayout locale={locale}>
      <I18nProvider locale={locale} namespaces={[
        'Game.Berry',
        'Game.Field',
        'Game.PokemonName',
        'UI.Common',
        'UI.InPage.Pokedex',
        'UI.InPage.Berry',
      ]}>
        <BerryPageClient {...props}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};

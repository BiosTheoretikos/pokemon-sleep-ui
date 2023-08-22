import React from 'react';

import {useTranslations} from 'next-intl';

import {PokemonIngredientTypeTitle} from '@/components/shared/pokemon/ingredients/typeTitle';
import {PokemonInputType} from '@/components/shared/pokemon/input/type';


type Props = {
  type: PokemonInputType
};

export const PokemonFilterTitle = ({type}: Props) => {
  const t = useTranslations('UI.InPage.Pokedex.Info');

  if (type === 'pokemonType') {
    return <>{t('PokemonType')}</>;
  }

  if (type === 'sleepType') {
    return <>{t('SleepType')}</>;
  }

  if (type === 'specialty') {
    return <>{t('Specialty')}</>;
  }

  if (type === 'ingredientFixed') {
    return <PokemonIngredientTypeTitle type="fixed"/>;
  }

  if (type === 'ingredientRandom') {
    return <PokemonIngredientTypeTitle type="random"/>;
  }

  if (type === 'berry') {
    return <>{t('Berry')}</>;
  }

  if (type === 'mainSkill') {
    return <>{t('MainSkill')}</>;
  }

  if (type === 'evolutionStage') {
    return <>{t('Evolution')}</>;
  }

  throw new Error(`Unhandled pokemon filter title of type ${type satisfies never}`);
};

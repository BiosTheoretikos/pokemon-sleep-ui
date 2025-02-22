import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {PokemonNameProps} from '@/components/shared/pokemon/name/type';


type Props = PokemonNameProps & {
  className?: string,
};

export const PokemonNameSmall = ({pokemon, override, className}: Props) => {
  const {id, type} = pokemon;
  const t = useTranslations('Game');

  return (
    <Flex direction="row" noFullWidth className={clsx('items-center gap-1 text-lg', className)}>
      <PokemonTypeIcon type={type} dimension="h-6 w-6"/>
      <div className="truncate">
        {override ?? t(`PokemonName.${id}`)}
      </div>
      <div className="self-end text-xs text-slate-500">
        #{id}
      </div>
    </Flex>
  );
};

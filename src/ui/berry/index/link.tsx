import React from 'react';

import {useTranslations} from 'next-intl';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonTypeIcon} from '@/components/shared/icon/pokeType';
import {imageSmallIconSizes} from '@/styles/image';
import {BerryData} from '@/types/game/berry';
import {formatInt} from '@/utils/number/format';


type Props = {
  berryData: BerryData,
};

export const BerryLink = ({berryData}: Props) => {
  const {id} = berryData;

  const t = useTranslations('Game.Berry');
  const t2 = useTranslations('UI.InPage.Berry');

  const berryName = t(id.toString());
  const berryEnergyArray = berryData.energy.map(({energy}) => energy);

  return (
    <Link href={`/berry/${id}`} className="w-full">
      <Flex key={id} center className="button-clickable-bg gap-0.5 p-1">
        <Flex center className="relative">
          <div className="absolute bottom-0 right-1">
            <PokemonTypeIcon type={id} dimension="h-8 w-8"/>
          </div>
          <div className="relative h-12 w-12">
            <NextImage src={`/images/berry/${id}.png`} alt={berryName} sizes={imageSmallIconSizes}/>
          </div>
        </Flex>
        <div className="whitespace-nowrap p-1">
          {berryName}
        </div>
        <Flex direction="row" center className="gap-1">
          <ColoredEnergyIcon alt={t2('Energy')}/>
          <div>
            {formatInt(Math.min(...berryEnergyArray))} ~ {formatInt(Math.max(...berryEnergyArray))}
          </div>
        </Flex>
      </Flex>
    </Link>
  );
};

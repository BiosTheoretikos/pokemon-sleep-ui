import React from 'react';

import Image from 'next/image';

import {Flex} from '@/components/layout/flex';
import {imageGallerySizes} from '@/styles/image';
import {MapStats} from '@/ui/map/common/stats';
import {MapCommonProps} from '@/ui/map/page/type';


export const MapMeta = ({mapId, mapName, sleepStyles}: MapCommonProps) => {
  return (
    <Flex key={mapId} direction="col" className="relative h-28 md:w-2/3">
      <Image
        src={`/images/field/${mapId}.png`} alt={mapName}
        fill sizes={imageGallerySizes} className="rounded-xl opacity-50 dark:opacity-25"
      />
      <Flex direction="col" center className="z-10 h-full gap-1 p-1.5">
        <h4 className="text-xl">
          {mapName}
        </h4>
        <MapStats sleepStyles={sleepStyles}/>
      </Flex>
    </Flex>
  );
};
